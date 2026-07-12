-- Store platform download fee payments + save document only on paid PDF generation

create table if not exists public.download_payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.app_users(id) on delete cascade,
  document_id text not null references public.documents(id) on delete cascade,
  amount numeric(12, 2) not null,
  currency text not null default 'INR',
  method text not null check (method in ('upi', 'card', 'other')),
  status text not null default 'success' check (status in ('success', 'failed', 'pending')),
  payer_ref text,
  details jsonb not null default '{}'::jsonb,
  paid_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create index if not exists download_payments_user_id_idx on public.download_payments (user_id);
create index if not exists download_payments_document_id_idx on public.download_payments (document_id);
create index if not exists download_payments_paid_at_idx on public.download_payments (paid_at desc);

comment on table public.download_payments is 'Platform PDF unlock payments (not property consideration). No PDF file is stored.';

alter table public.download_payments enable row level security;
revoke all on table public.download_payments from anon, authenticated;

-- Single atomic write: document payload + child rows + download payment (no PDF bytes)
create or replace function public.finalize_paid_document(
  p_token text,
  p_document jsonb,
  p_payment jsonb
)
returns json
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid;
  v_id text;
  v_now timestamptz := now();
  v_payment_id uuid;
  v_amount numeric(12, 2);
  v_method text;
  v_status text;
  v_payer_ref text;
  v_saved jsonb;
begin
  v_user_id := public._resolve_session_user(p_token);
  if v_user_id is null then
    raise exception 'Unauthorized' using errcode = '42501';
  end if;

  if p_document is null or jsonb_typeof(p_document) <> 'object' then
    raise exception 'Document payload required' using errcode = '22023';
  end if;

  if p_payment is null or jsonb_typeof(p_payment) <> 'object' then
    raise exception 'Payment details required' using errcode = '22023';
  end if;

  v_id := coalesce(nullif(trim(p_document->>'id'), ''), 'doc_' || replace(gen_random_uuid()::text, '-', ''));
  v_amount := coalesce(nullif(p_payment->>'amount', '')::numeric, 0);
  v_method := coalesce(nullif(p_payment->>'method', ''), 'other');
  if v_method not in ('upi', 'card', 'other') then
    v_method := 'other';
  end if;
  v_status := coalesce(nullif(p_payment->>'status', ''), 'success');
  if v_status not in ('success', 'failed', 'pending') then
    v_status := 'success';
  end if;
  v_payer_ref := nullif(trim(coalesce(p_payment->>'payerRef', p_payment->>'upiId', '')), '');

  -- Upsert document (full filled form in payload; no PDF file)
  insert into public.documents as d (
    id, user_id, document_type, template_id, locale, status, version,
    document_number, registration_date, payload, created_at, updated_at, generated_at
  ) values (
    v_id,
    v_user_id,
    coalesce(nullif(p_document->>'documentType', ''), 'sale_deed'),
    p_document->>'templateId',
    coalesce(nullif(p_document->>'locale', ''), 'gu'),
    'generated',
    p_document->>'version',
    p_document->>'documentNumber',
    p_document->>'registrationDate',
    p_document || jsonb_build_object(
      'id', v_id,
      'status', 'generated',
      'generatedAt', coalesce(p_document->>'generatedAt', v_now::text),
      'downloadPayment', p_payment
    ),
    coalesce((p_document->>'createdAt')::timestamptz, v_now),
    v_now,
    coalesce((p_document->>'generatedAt')::timestamptz, v_now)
  )
  on conflict (id) do update
  set
    document_type = excluded.document_type,
    template_id = excluded.template_id,
    locale = excluded.locale,
    status = 'generated',
    version = excluded.version,
    document_number = excluded.document_number,
    registration_date = excluded.registration_date,
    payload = excluded.payload,
    updated_at = v_now,
    generated_at = excluded.generated_at
  where d.user_id = v_user_id;

  if not exists (select 1 from public.documents where id = v_id and user_id = v_user_id) then
    raise exception 'Forbidden' using errcode = '42501';
  end if;

  perform public._sync_document_children(
    v_id,
    v_user_id,
    p_document || jsonb_build_object('id', v_id, 'status', 'generated')
  );

  insert into public.download_payments (
    user_id, document_id, amount, currency, method, status, payer_ref, details, paid_at
  ) values (
    v_user_id,
    v_id,
    v_amount,
    coalesce(nullif(p_payment->>'currency', ''), 'INR'),
    v_method,
    v_status,
    v_payer_ref,
    p_payment,
    coalesce((p_payment->>'paidAt')::timestamptz, v_now)
  )
  returning id into v_payment_id;

  select payload into v_saved
  from public.documents
  where id = v_id and user_id = v_user_id;

  return json_build_object(
    'document', v_saved,
    'payment', json_build_object(
      'id', v_payment_id,
      'documentId', v_id,
      'amount', v_amount,
      'method', v_method,
      'status', v_status,
      'payerRef', v_payer_ref
    ),
    'savedAt', v_now
  );
end;
$$;

revoke all on function public.finalize_paid_document(text, jsonb, jsonb) from public;
grant execute on function public.finalize_paid_document(text, jsonb, jsonb) to anon, authenticated;
