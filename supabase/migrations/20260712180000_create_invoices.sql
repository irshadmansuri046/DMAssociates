-- Platform tax invoices (GST-inclusive service fee)

create table if not exists public.invoices (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.app_users(id) on delete cascade,
  document_id text references public.documents(id) on delete set null,
  download_payment_id uuid references public.download_payments(id) on delete set null,
  invoice_no text not null,
  invoice_date timestamptz not null default now(),
  issued_by text not null default 'DM Associates',
  bill_to_name text,
  bill_to_email text,
  description text not null default 'Sale Deed — Platform service fee',
  document_type text,
  amount_inclusive numeric(12, 2) not null,
  taxable_value numeric(12, 2) not null,
  cgst numeric(12, 2) not null default 0,
  sgst numeric(12, 2) not null default 0,
  gst_amount numeric(12, 2) not null,
  gst_rate_percent numeric(5, 2) not null default 18,
  currency text not null default 'INR',
  payment_method text,
  payer_ref text,
  status text not null default 'paid' check (status in ('paid', 'pending', 'cancelled', 'refunded')),
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint invoices_invoice_no_unique unique (invoice_no)
);

create index if not exists invoices_user_id_idx on public.invoices (user_id);
create index if not exists invoices_document_id_idx on public.invoices (document_id);
create index if not exists invoices_invoice_date_idx on public.invoices (invoice_date desc);
create index if not exists invoices_user_date_idx on public.invoices (user_id, invoice_date desc);

comment on table public.invoices is 'Tax invoices for platform PDF unlock fees (GST inclusive). PDF file is not stored.';

alter table public.invoices enable row level security;
revoke all on table public.invoices from anon, authenticated;

-- Upsert invoice for logged-in user (by invoice_no)
create or replace function public.save_user_invoice(p_token text, p_invoice jsonb)
returns json
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid;
  v_row public.invoices%rowtype;
  v_invoice_no text;
  v_document_id text;
begin
  v_user_id := public._resolve_session_user(p_token);
  if v_user_id is null then
    raise exception 'Unauthorized' using errcode = '42501';
  end if;

  if p_invoice is null or jsonb_typeof(p_invoice) <> 'object' then
    raise exception 'Invoice payload required' using errcode = '22023';
  end if;

  v_invoice_no := nullif(trim(coalesce(p_invoice->>'invoiceNo', p_invoice->>'invoice_no', '')), '');
  if v_invoice_no is null then
    raise exception 'invoiceNo is required' using errcode = '22023';
  end if;

  v_document_id := nullif(trim(coalesce(p_invoice->>'documentId', p_invoice->>'document_id', '')), '');

  -- Ensure document belongs to user when provided
  if v_document_id is not null and not exists (
    select 1 from public.documents d where d.id = v_document_id and d.user_id = v_user_id
  ) then
    raise exception 'Document not found' using errcode = 'P0002';
  end if;

  insert into public.invoices as i (
    user_id,
    document_id,
    download_payment_id,
    invoice_no,
    invoice_date,
    issued_by,
    bill_to_name,
    bill_to_email,
    description,
    document_type,
    amount_inclusive,
    taxable_value,
    cgst,
    sgst,
    gst_amount,
    gst_rate_percent,
    currency,
    payment_method,
    payer_ref,
    status,
    details,
    updated_at
  ) values (
    v_user_id,
    v_document_id,
    nullif(p_invoice->>'downloadPaymentId', '')::uuid,
    v_invoice_no,
    coalesce((p_invoice->>'invoiceDate')::timestamptz, (p_invoice->>'paidAt')::timestamptz, now()),
    coalesce(nullif(p_invoice->>'issuedBy', ''), 'DM Associates'),
    p_invoice->>'billToName',
    p_invoice->>'billToEmail',
    coalesce(nullif(p_invoice->>'description', ''), 'Sale Deed — Platform service fee'),
    p_invoice->>'documentType',
    coalesce(nullif(p_invoice->>'amountInclusive', '')::numeric, nullif(p_invoice->>'amount', '')::numeric, 0),
    coalesce(nullif(p_invoice->>'taxableValue', '')::numeric, 0),
    coalesce(nullif(p_invoice->>'cgst', '')::numeric, 0),
    coalesce(nullif(p_invoice->>'sgst', '')::numeric, 0),
    coalesce(nullif(p_invoice->>'gstAmount', '')::numeric, 0),
    coalesce(nullif(p_invoice->>'gstRatePercent', '')::numeric, 18),
    coalesce(nullif(p_invoice->>'currency', ''), 'INR'),
    p_invoice->>'paymentMethod',
    p_invoice->>'payerRef',
    coalesce(nullif(p_invoice->>'status', ''), 'paid'),
    coalesce(p_invoice->'details', p_invoice, '{}'::jsonb),
    now()
  )
  on conflict (invoice_no) do update
  set
    document_id = coalesce(excluded.document_id, i.document_id),
    download_payment_id = coalesce(excluded.download_payment_id, i.download_payment_id),
    invoice_date = excluded.invoice_date,
    issued_by = excluded.issued_by,
    bill_to_name = excluded.bill_to_name,
    bill_to_email = excluded.bill_to_email,
    description = excluded.description,
    document_type = coalesce(excluded.document_type, i.document_type),
    amount_inclusive = excluded.amount_inclusive,
    taxable_value = excluded.taxable_value,
    cgst = excluded.cgst,
    sgst = excluded.sgst,
    gst_amount = excluded.gst_amount,
    gst_rate_percent = excluded.gst_rate_percent,
    currency = excluded.currency,
    payment_method = excluded.payment_method,
    payer_ref = excluded.payer_ref,
    status = excluded.status,
    details = excluded.details,
    updated_at = now()
  where i.user_id = v_user_id
  returning * into v_row;

  if v_row.id is null then
    raise exception 'Forbidden' using errcode = '42501';
  end if;

  return json_build_object(
    'id', v_row.id,
    'invoiceNo', v_row.invoice_no,
    'invoiceDate', v_row.invoice_date,
    'issuedBy', v_row.issued_by,
    'billToName', v_row.bill_to_name,
    'billToEmail', v_row.bill_to_email,
    'description', v_row.description,
    'documentType', v_row.document_type,
    'documentId', v_row.document_id,
    'amountInclusive', v_row.amount_inclusive,
    'taxableValue', v_row.taxable_value,
    'cgst', v_row.cgst,
    'sgst', v_row.sgst,
    'gstAmount', v_row.gst_amount,
    'gstRatePercent', v_row.gst_rate_percent,
    'currency', v_row.currency,
    'paymentMethod', v_row.payment_method,
    'payerRef', v_row.payer_ref,
    'status', v_row.status,
    'createdAt', v_row.created_at
  );
end;
$$;

revoke all on function public.save_user_invoice(text, jsonb) from public;
grant execute on function public.save_user_invoice(text, jsonb) to anon, authenticated;

create or replace function public.list_user_invoices(p_token text)
returns json
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid;
begin
  v_user_id := public._resolve_session_user(p_token);
  if v_user_id is null then
    raise exception 'Unauthorized' using errcode = '42501';
  end if;

  return coalesce((
    select json_agg(row_to_json(t) order by t."invoiceDate" desc)
    from (
      select
        i.id,
        i.invoice_no as "invoiceNo",
        i.invoice_date as "invoiceDate",
        i.issued_by as "issuedBy",
        i.bill_to_name as "billToName",
        i.bill_to_email as "billToEmail",
        i.description,
        i.document_type as "documentType",
        i.document_id as "documentId",
        i.amount_inclusive as "amountInclusive",
        i.taxable_value as "taxableValue",
        i.cgst,
        i.sgst,
        i.gst_amount as "gstAmount",
        i.gst_rate_percent as "gstRatePercent",
        i.currency,
        i.payment_method as "paymentMethod",
        i.payer_ref as "payerRef",
        i.status,
        i.created_at as "createdAt"
      from public.invoices i
      where i.user_id = v_user_id
      order by i.invoice_date desc
    ) t
  ), '[]'::json);
end;
$$;

revoke all on function public.list_user_invoices(text) from public;
grant execute on function public.list_user_invoices(text) to anon, authenticated;

-- When a paid document is finalized, attach document_id / payment id to matching invoice
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
  v_invoice_no text;
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
  v_invoice_no := nullif(trim(coalesce(p_payment->>'invoiceNo', '')), '');

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

  if v_invoice_no is not null then
    update public.invoices
       set document_id = v_id,
           download_payment_id = v_payment_id,
           updated_at = v_now
     where invoice_no = v_invoice_no
       and user_id = v_user_id;
  end if;

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
      'payerRef', v_payer_ref,
      'invoiceNo', v_invoice_no
    ),
    'savedAt', v_now
  );
end;
$$;
