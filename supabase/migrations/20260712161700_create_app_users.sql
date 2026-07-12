-- App users for DM Associates login (admin / user)
create extension if not exists pgcrypto with schema extensions;

create table if not exists public.app_users (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  password_hash text not null,
  role text not null check (role in ('admin', 'user')),
  full_name text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint app_users_email_unique unique (email)
);

create index if not exists app_users_email_lower_idx on public.app_users (lower(email));

comment on table public.app_users is 'Hardcoded application users for login; passwords stored as bcrypt hashes.';

alter table public.app_users enable row level security;

-- No direct table access for anon/authenticated — login only via RPC
revoke all on table public.app_users from anon, authenticated;
grant usage on schema public to anon, authenticated;

create or replace function public.authenticate_app_user(p_email text, p_password text)
returns json
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  u public.app_users%rowtype;
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

  return json_build_object(
    'id', u.id,
    'email', u.email,
    'role', u.role,
    'full_name', u.full_name
  );
end;
$$;

revoke all on function public.authenticate_app_user(text, text) from public;
grant execute on function public.authenticate_app_user(text, text) to anon, authenticated;

-- Seed demo users (bcrypt via pgcrypto in extensions schema)
insert into public.app_users (email, password_hash, role, full_name)
values
  ('irshad@demo.com', extensions.crypt('irshad123', extensions.gen_salt('bf')), 'admin', 'Irshad'),
  ('jahid@demo.com', extensions.crypt('jahid123', extensions.gen_salt('bf')), 'user', 'Jahid')
on conflict (email) do update
set
  password_hash = excluded.password_hash,
  role = excluded.role,
  full_name = excluded.full_name,
  is_active = true,
  updated_at = now();
