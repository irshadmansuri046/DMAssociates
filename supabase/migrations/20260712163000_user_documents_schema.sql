-- User sessions + document storage (per app_users)

-- ---------------------------------------------------------------------------
-- Sessions (issued on login; required for document RPCs)
-- ---------------------------------------------------------------------------
create table if not exists public.app_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.app_users(id) on delete cascade,
  token text not null unique,
  expires_at timestamptz not null,
  created_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now()
);

create index if not exists app_sessions_user_id_idx on public.app_sessions (user_id);
create index if not exists app_sessions_expires_at_idx on public.app_sessions (expires_at);

alter table public.app_sessions enable row level security;
revoke all on table public.app_sessions from anon, authenticated;

-- ---------------------------------------------------------------------------
-- Core document + related tables
-- ---------------------------------------------------------------------------
create table if not exists public.documents (
  id text primary key,
  user_id uuid not null references public.app_users(id) on delete cascade,
  document_type text not null default 'sale_deed',
  template_id text,
  locale text not null default 'gu',
  status text not null default 'draft',
  version text,
  document_number text,
  registration_date text,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  generated_at timestamptz
);

create index if not exists documents_user_id_idx on public.documents (user_id);
create index if not exists documents_user_updated_idx on public.documents (user_id, updated_at desc);
create index if not exists documents_status_idx on public.documents (status);

comment on table public.documents is 'Full deed documents owned by an app user; payload holds complete form JSON.';

create table if not exists public.parties (
  id uuid primary key default gen_random_uuid(),
  document_id text not null references public.documents(id) on delete cascade,
  user_id uuid not null references public.app_users(id) on delete cascade,
  role text not null check (role in ('seller', 'buyer')),
  sort_order integer not null default 0,
  party_type text,
  fields jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists parties_document_id_idx on public.parties (document_id);
create index if not exists parties_user_id_idx on public.parties (user_id);

create table if not exists public.properties (
  id uuid primary key default gen_random_uuid(),
  document_id text not null unique references public.documents(id) on delete cascade,
  user_id uuid not null references public.app_users(id) on delete cascade,
  fields jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists properties_user_id_idx on public.properties (user_id);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  document_id text not null references public.documents(id) on delete cascade,
  user_id uuid not null references public.app_users(id) on delete cascade,
  sort_order integer not null default 0,
  fields jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists payments_document_id_idx on public.payments (document_id);
create index if not exists payments_user_id_idx on public.payments (user_id);

create table if not exists public.gov_records (
  id uuid primary key default gen_random_uuid(),
  document_id text not null references public.documents(id) on delete cascade,
  user_id uuid not null references public.app_users(id) on delete cascade,
  module text not null,
  fields jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  unique (document_id, module)
);

create index if not exists gov_records_document_id_idx on public.gov_records (document_id);
create index if not exists gov_records_user_id_idx on public.gov_records (user_id);

create table if not exists public.title_history (
  id uuid primary key default gen_random_uuid(),
  document_id text not null references public.documents(id) on delete cascade,
  user_id uuid not null references public.app_users(id) on delete cascade,
  sort_order integer not null default 0,
  fields jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists title_history_document_id_idx on public.title_history (document_id);

create table if not exists public.witnesses (
  id uuid primary key default gen_random_uuid(),
  document_id text not null references public.documents(id) on delete cascade,
  user_id uuid not null references public.app_users(id) on delete cascade,
  sort_order integer not null default 0,
  fields jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists witnesses_document_id_idx on public.witnesses (document_id);

create table if not exists public.generated_pdfs (
  id uuid primary key default gen_random_uuid(),
  document_id text not null references public.documents(id) on delete cascade,
  user_id uuid not null references public.app_users(id) on delete cascade,
  storage_path text,
  file_name text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists generated_pdfs_document_id_idx on public.generated_pdfs (document_id);
create index if not exists generated_pdfs_user_id_idx on public.generated_pdfs (user_id);

-- Lock down tables: access only via SECURITY DEFINER RPCs
alter table public.documents enable row level security;
alter table public.parties enable row level security;
alter table public.properties enable row level security;
alter table public.payments enable row level security;
alter table public.gov_records enable row level security;
alter table public.title_history enable row level security;
alter table public.witnesses enable row level security;
alter table public.generated_pdfs enable row level security;

revoke all on table public.documents from anon, authenticated;
revoke all on table public.parties from anon, authenticated;
revoke all on table public.properties from anon, authenticated;
revoke all on table public.payments from anon, authenticated;
revoke all on table public.gov_records from anon, authenticated;
revoke all on table public.title_history from anon, authenticated;
revoke all on table public.witnesses from anon, authenticated;
revoke all on table public.generated_pdfs from anon, authenticated;

-- ---------------------------------------------------------------------------
-- Session helpers
-- ---------------------------------------------------------------------------
create or replace function public._resolve_session_user(p_token text)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid;
begin
  if p_token is null or length(trim(p_token)) = 0 then
    return null;
  end if;

  update public.app_sessions
     set last_seen_at = now()
   where token = trim(p_token)
     and expires_at > now()
  returning user_id into v_user_id;

  return v_user_id;
end;
$$;

revoke all on function public._resolve_session_user(text) from public;

create or replace function public.logout_app_session(p_token text)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
begin
  delete from public.app_sessions where token = trim(coalesce(p_token, ''));
  return true;
end;
$$;

revoke all on function public.logout_app_session(text) from public;
grant execute on function public.logout_app_session(text) to anon, authenticated;

-- Replace login to also issue a session token
create or replace function public.authenticate_app_user(p_email text, p_password text)
returns json
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  u public.app_users%rowtype;
  v_token text;
  v_expires timestamptz;
begin
  if p_email is null or length(trim(p_email)) = 0 or p_password is null then
    return null;
  end if;

  select *
    into u
  from public.app_users
  where lower(email) = lower(trim(p_email))
    and is_active = true
    and password_hash = extensions.crypt(p_password, password_hash)
  limit 1;

  if not found then
    return null;
  end if;

  v_token := encode(extensions.gen_random_bytes(32), 'hex');
  v_expires := now() + interval '7 days';

  insert into public.app_sessions (user_id, token, expires_at)
  values (u.id, v_token, v_expires);

  return json_build_object(
    'id', u.id,
    'email', u.email,
    'role', u.role,
    'full_name', u.full_name,
    'session_token', v_token,
    'session_expires_at', v_expires
  );
end;
$$;

-- ---------------------------------------------------------------------------
-- Sync child rows from document payload
-- ---------------------------------------------------------------------------
create or replace function public._sync_document_children(
  p_document_id text,
  p_user_id uuid,
  p_payload jsonb
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_item jsonb;
  v_idx integer;
  v_module text;
  v_gov jsonb;
begin
  delete from public.parties where document_id = p_document_id;
  delete from public.properties where document_id = p_document_id;
  delete from public.payments where document_id = p_document_id;
  delete from public.gov_records where document_id = p_document_id;
  delete from public.title_history where document_id = p_document_id;
  delete from public.witnesses where document_id = p_document_id;

  -- sellers
  v_idx := 0;
  for v_item in
    select * from jsonb_array_elements(coalesce(p_payload->'parties'->'sellers', '[]'::jsonb))
  loop
    insert into public.parties (document_id, user_id, role, sort_order, party_type, fields)
    values (
      p_document_id,
      p_user_id,
      'seller',
      v_idx,
      coalesce(v_item->>'partyType', v_item->>'type'),
      v_item
    );
    v_idx := v_idx + 1;
  end loop;

  -- buyers
  v_idx := 0;
  for v_item in
    select * from jsonb_array_elements(coalesce(p_payload->'parties'->'buyers', '[]'::jsonb))
  loop
    insert into public.parties (document_id, user_id, role, sort_order, party_type, fields)
    values (
      p_document_id,
      p_user_id,
      'buyer',
      v_idx,
      coalesce(v_item->>'partyType', v_item->>'type'),
      v_item
    );
    v_idx := v_idx + 1;
  end loop;

  if p_payload ? 'property' then
    insert into public.properties (document_id, user_id, fields, updated_at)
    values (p_document_id, p_user_id, coalesce(p_payload->'property', '{}'::jsonb), now());
  end if;

  v_idx := 0;
  for v_item in
    select * from jsonb_array_elements(coalesce(p_payload->'transaction'->'payments', '[]'::jsonb))
  loop
    insert into public.payments (document_id, user_id, sort_order, fields)
    values (p_document_id, p_user_id, v_idx, v_item);
    v_idx := v_idx + 1;
  end loop;

  v_gov := coalesce(p_payload->'property'->'govRecords', '{}'::jsonb);
  for v_module in
    select key from jsonb_object_keys(v_gov) as t(key)
  loop
    insert into public.gov_records (document_id, user_id, module, fields)
    values (p_document_id, p_user_id, v_module, coalesce(v_gov->v_module, '{}'::jsonb));
  end loop;

  v_idx := 0;
  for v_item in
    select * from jsonb_array_elements(coalesce(p_payload->'titleHistory', '[]'::jsonb))
  loop
    insert into public.title_history (document_id, user_id, sort_order, fields)
    values (p_document_id, p_user_id, v_idx, v_item);
    v_idx := v_idx + 1;
  end loop;

  v_idx := 0;
  for v_item in
    select * from jsonb_array_elements(coalesce(p_payload->'witnesses', '[]'::jsonb))
  loop
    insert into public.witnesses (document_id, user_id, sort_order, fields)
    values (p_document_id, p_user_id, v_idx, v_item);
    v_idx := v_idx + 1;
  end loop;
end;
$$;

revoke all on function public._sync_document_children(text, uuid, jsonb) from public;

-- ---------------------------------------------------------------------------
-- Document RPCs
-- ---------------------------------------------------------------------------
create or replace function public.save_user_document(p_token text, p_document jsonb)
returns json
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid;
  v_id text;
  v_now timestamptz := now();
  v_created timestamptz;
begin
  v_user_id := public._resolve_session_user(p_token);
  if v_user_id is null then
    raise exception 'Unauthorized' using errcode = '42501';
  end if;

  v_id := coalesce(nullif(trim(p_document->>'id'), ''), 'doc_' || replace(gen_random_uuid()::text, '-', ''));

  select created_at into v_created
  from public.documents
  where id = v_id and user_id = v_user_id;

  insert into public.documents as d (
    id, user_id, document_type, template_id, locale, status, version,
    document_number, registration_date, payload, created_at, updated_at, generated_at
  ) values (
    v_id,
    v_user_id,
    coalesce(nullif(p_document->>'documentType', ''), 'sale_deed'),
    p_document->>'templateId',
    coalesce(nullif(p_document->>'locale', ''), 'gu'),
    coalesce(nullif(p_document->>'status', ''), 'draft'),
    p_document->>'version',
    p_document->>'documentNumber',
    p_document->>'registrationDate',
    p_document,
    coalesce((p_document->>'createdAt')::timestamptz, v_now),
    coalesce((p_document->>'updatedAt')::timestamptz, v_now),
    nullif(p_document->>'generatedAt', '')::timestamptz
  )
  on conflict (id) do update
  set
    document_type = excluded.document_type,
    template_id = excluded.template_id,
    locale = excluded.locale,
    status = excluded.status,
    version = excluded.version,
    document_number = excluded.document_number,
    registration_date = excluded.registration_date,
    payload = excluded.payload,
    updated_at = excluded.updated_at,
    generated_at = excluded.generated_at
  where d.user_id = v_user_id;

  if not exists (select 1 from public.documents where id = v_id and user_id = v_user_id) then
    raise exception 'Forbidden' using errcode = '42501';
  end if;

  perform public._sync_document_children(v_id, v_user_id, p_document);

  return (
    select payload || jsonb_build_object(
      'id', id,
      'userId', user_id,
      'updatedAt', updated_at,
      'createdAt', created_at
    )
    from public.documents
    where id = v_id and user_id = v_user_id
  );
end;
$$;

revoke all on function public.save_user_document(text, jsonb) from public;
grant execute on function public.save_user_document(text, jsonb) to anon, authenticated;

create or replace function public.get_user_document(p_token text, p_document_id text)
returns json
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid;
  v_row public.documents%rowtype;
begin
  v_user_id := public._resolve_session_user(p_token);
  if v_user_id is null then
    raise exception 'Unauthorized' using errcode = '42501';
  end if;

  select * into v_row
  from public.documents
  where id = p_document_id and user_id = v_user_id;

  if not found then
    return null;
  end if;

  return v_row.payload || jsonb_build_object(
    'id', v_row.id,
    'userId', v_row.user_id,
    'createdAt', v_row.created_at,
    'updatedAt', v_row.updated_at,
    'generatedAt', v_row.generated_at
  );
end;
$$;

revoke all on function public.get_user_document(text, text) from public;
grant execute on function public.get_user_document(text, text) to anon, authenticated;

create or replace function public.list_user_documents(p_token text)
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
    select json_agg(row_to_json(t) order by t.updated_at desc)
    from (
      select
        d.id,
        d.document_type as "documentType",
        d.template_id as "templateId",
        d.locale,
        d.status,
        d.version,
        d.document_number as "documentNumber",
        d.updated_at as "updatedAt",
        d.created_at as "createdAt",
        d.generated_at as "generatedAt"
      from public.documents d
      where d.user_id = v_user_id
    ) t
  ), '[]'::json);
end;
$$;

revoke all on function public.list_user_documents(text) from public;
grant execute on function public.list_user_documents(text) to anon, authenticated;

create or replace function public.delete_user_document(p_token text, p_document_id text)
returns boolean
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

  delete from public.documents
  where id = p_document_id and user_id = v_user_id;

  return found;
end;
$$;

revoke all on function public.delete_user_document(text, text) from public;
grant execute on function public.delete_user_document(text, text) to anon, authenticated;

create or replace function public.register_generated_pdf(
  p_token text,
  p_document_id text,
  p_file_name text default null,
  p_storage_path text default null,
  p_metadata jsonb default '{}'::jsonb
)
returns json
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid;
  v_row public.generated_pdfs%rowtype;
begin
  v_user_id := public._resolve_session_user(p_token);
  if v_user_id is null then
    raise exception 'Unauthorized' using errcode = '42501';
  end if;

  if not exists (
    select 1 from public.documents where id = p_document_id and user_id = v_user_id
  ) then
    raise exception 'Document not found' using errcode = 'P0002';
  end if;

  insert into public.generated_pdfs (document_id, user_id, file_name, storage_path, metadata)
  values (
    p_document_id,
    v_user_id,
    p_file_name,
    p_storage_path,
    coalesce(p_metadata, '{}'::jsonb)
  )
  returning * into v_row;

  update public.documents
     set status = 'generated',
         generated_at = now(),
         updated_at = now()
   where id = p_document_id and user_id = v_user_id;

  return json_build_object(
    'id', v_row.id,
    'documentId', v_row.document_id,
    'fileName', v_row.file_name,
    'storagePath', v_row.storage_path,
    'metadata', v_row.metadata,
    'createdAt', v_row.created_at
  );
end;
$$;

revoke all on function public.register_generated_pdf(text, text, text, text, jsonb) from public;
grant execute on function public.register_generated_pdf(text, text, text, text, jsonb) to anon, authenticated;
