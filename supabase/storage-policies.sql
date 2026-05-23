-- Supabase Storage policies for bucket: company-documents

-- Create a bucket named `company-documents` in Supabase Storage UI.

-- Example policies (SQL for Supabase Policies panel):

-- Allow public read for files marked as public in `documents` table.
-- This policy assumes the `documents` table stores `bucket` and `path` and `public` flag.

-- Public read policy: allow anyone to download if corresponding document row is public.
-- Policy expression (pseudo):
--   exists(select 1 from public.documents d where d.bucket = 'company-documents' and d.path = object.name and d.public = true)

-- In Supabase UI, create a policy on `storage.objects` (for select/download):
-- USING clause example:
--   exists(select 1 from public.documents d where d.bucket = 'company-documents' and d.path = storage.objects.name and d.public = true)

-- Admin upload/update/delete policy: restrict to authenticated admins
-- USING / WITH CHECK example for insert/update/delete:
--   auth.role() = 'authenticated' and public.is_admin(auth.uid()::uuid)

-- Specific policies you should add in Supabase (manual steps):
-- 1) Policy: "public_download_if_document_public"
--    - Target: storage.objects
--    - Operation: SELECT
--    - USING: exists(select 1 from public.documents d where d.bucket = 'company-documents' and d.path = storage.objects.name and d.public = true)

-- 2) Policy: "admin_manage_storage_objects"
--    - Target: storage.objects
--    - Operations: INSERT, UPDATE, DELETE
--    - USING: auth.role() = 'authenticated' and public.is_admin(auth.uid()::uuid)
--    - WITH CHECK: auth.role() = 'authenticated' and public.is_admin(auth.uid()::uuid)

-- Notes:
-- - Supabase Storage policies cannot reference storage metadata directly in SQL functions; the example uses the `documents` table to map object names.
-- - Ensure uploaded object names are stored in `documents.path` immediately after upload (transactionally if possible).
-- - For public buckets you may alternatively set file-level signed URLs for private content.
