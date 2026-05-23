# MVP Technical Design

Recommended architecture
------------------------
- Next.js App Router with server and client components.
- Keep data access and Supabase client initialization in server-only modules.
- Use API route handlers (server actions / route handlers) for server-only logic like stock API proxying and admin guards.

Next.js route structure
-----------------------
- app/
  - page.tsx (home)
  - analysis/page.tsx
  - analysis/[slug]/page.tsx
  - companies/page.tsx
  - companies/[slug]/page.tsx
  - documents/page.tsx
  - admin/page.tsx
  - admin/companies/page.tsx
  - admin/analysis/[id]/page.tsx
  - api/stock/route.ts (server) — proxies Alpha Vantage

Server/client component rules
----------------------------
- Server components for pages that read from Supabase or need secret access.
- Client components only for interactivity (forms, editors, charts). Any action modifying data must hit server route handlers.

Supabase database tables
-----------------------
See `supabase/schema.sql` for detailed schema. Key tables: `admin_users`, `companies`, `analysis_posts`, `documents`, `stock_snapshots`.

Supabase Storage approach
------------------------
- Bucket `company-documents` for uploaded files.
- Use storage policies to allow public read on public docs and restrict upload/update/delete to admins.

Auth/admin approach
-------------------
- Use Supabase Google OAuth for admin login.
- Maintain `admin_users` table; RLS policies and server-side `is_admin()` check determine admin permissions.

Stock API approach with mock fallback
------------------------------------
- Alpha Vantage calls happen in server route `api/stock/route.ts` using server-only environment key.
- If API key missing or Alpha Vantage is unreachable, return deterministic mock data for UI.

Error handling strategy
-----------------------
- Surface friendly errors on pages.
- Server routes should return structured error responses.
- Public pages must render fallback/demo data when Supabase is not configured.

Environment variable strategy
-----------------------------
- Required server env vars (example names in `.env.example`):
  - NEXT_PUBLIC_SUPABASE_URL (public)
  - NEXT_PUBLIC_SUPABASE_ANON_KEY (public anon key)
  - NEXT_PUBLIC_ADMIN_EMAIL (optional admin filter)
  - ALPHA_VANTAGE_API_KEY (server-only; do not expose to client)
- Do not embed secret keys into client bundles. Use server route handlers for any secret usage.

Deployment strategy
-------------------
- Deploy on Vercel. Set environment variables in Vercel dashboard.
- Use Supabase production project and configure OAuth redirect URIs.
