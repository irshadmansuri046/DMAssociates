-- Fix list_user_documents ordering aliases
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
    select json_agg(row_to_json(t) order by t."updatedAt" desc)
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
      order by d.updated_at desc
    ) t
  ), '[]'::json);
end;
$$;
