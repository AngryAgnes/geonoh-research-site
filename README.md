# Geon Oh Kim Research

Project overview
-----------------
Geon Oh Kim Research is a personal equity research platform for publishing company analysis, organizing company pages, uploading supporting documents, and displaying basic stock data.

Product goal
------------
Create a clean, public-facing site for publishing research with a protected admin area for content management and uploads.

Planned stack
-------------
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Supabase (DB, Auth, Storage)
- MDX/Markdown for analysis content
- Alpha Vantage stock API (server-side) with mock fallback
- Vercel for deployment

MVP feature list
-----------------
- Public: home page, analysis index, analysis detail pages, company pages, document library, document downloads, basic stock snapshots/charts.
- Admin: Google OAuth login, protected dashboard, create/edit analysis posts, manage companies, upload documents (public/private), view recent activity.

Local setup (placeholder)
-------------------------
This run only created planning artifacts. T0001 will initialize the Next.js scaffold. After T0001, this section will contain the exact steps to run locally, environment variables to set, and Supabase connection steps.

Supabase setup (placeholder)
----------------------------
Supabase schema and storage policy SQL are provided in `supabase/schema.sql` and `supabase/storage-policies.sql`. Follow those files and the Supabase dashboard to create the DB, enable RLS, and configure buckets and OAuth.

Ticket-based workflow
---------------------
We use an explicit ticket-by-ticket workflow. Every implementation PR must reference a single ticket (T####). Use `docs/Codex_Ticket_Handoff_Template.md` when starting a ticket. Codex must implement only the assigned ticket — no multi-ticket sweeps.

Warning
-------
Do not let Codex implement multiple tickets at once. Enforce one-ticket-per-branch discipline and require a handoff template before work begins.
