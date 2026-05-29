-- Supabase Storage setup for bucket: company-documents

insert into storage.buckets (id, name, public)
values ('company-documents', 'company-documents', false)
on conflict (id) do nothing;

-- Public read for files that have a matching public row in public.documents.
do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'public_download_if_document_public'
  ) then
    create policy "public_download_if_document_public" on storage.objects
      for select using (
        bucket_id = 'company-documents'
        and exists (
          select 1
          from public.documents d
          where d.bucket = 'company-documents'
            and d.path = storage.objects.name
            and d.public = true
        )
      );
  end if;
end $$;

-- Admins can upload/update/delete objects in the research document bucket.
do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'admin_manage_storage_objects'
  ) then
    create policy "admin_manage_storage_objects" on storage.objects
      for all using (
        bucket_id = 'company-documents'
        and auth.role() = 'authenticated'
        and public.is_admin(auth.uid()::uuid)
      ) with check (
        bucket_id = 'company-documents'
        and auth.role() = 'authenticated'
        and public.is_admin(auth.uid()::uuid)
      );
  end if;
end $$;

-- The Next.js admin form uses the server-only service role key for uploads after
-- checking ADMIN_EMAILS. These policies are still useful if you later move uploads
-- to a browser client or authenticated Supabase user flow.
