# Full Design Document

Product Vision
--------------
Geon Oh Kim Research is a focused, lightweight research publishing platform that allows a single analyst (the owner) to publish deep-dive write-ups and supporting documents, organize company pages, and expose basic market data to readers.

Target User
-----------
- Retail investors and professionals who want clear, well-sourced company analyses.
- The site owner (admin) who writes and manages content.

Public User Journey
-------------------
1. Arrive at the home page and discover featured analyses or companies.
2. Browse or search analysis posts.
3. Read analysis (MDX/Markdown) with embedded charts and download links for public documents.
4. Visit a company page to see company-specific posts and documents.

Admin User Journey
------------------
1. Login via Google (Supabase OAuth) to access the admin dashboard.
2. Create or edit company pages and analysis posts (MDX or Markdown editor).
3. Upload supporting documents to Supabase Storage and set public/private.
4. Publish or unpublish posts, update companies, and review recent activity.

Page Map
--------
- / — Home
- /analysis — Analysis index (search/filter)
- /analysis/[slug] — Analysis detail
- /companies — Companies index
- /companies/[slug] — Company page
- /documents — Public document library
- /admin — Admin dashboard (protected)
- /admin/companies — Manage companies
- /admin/analysis — Create/edit analysis
- /admin/documents — Upload/manage documents

Data Model Overview
-------------------
- `admin_users` — manages who is allowed to perform admin actions.
- `companies` — company metadata and slug, descriptions, tickers.
- `analysis_posts` — MDX/Markdown content, author (admin_user), status (draft/published), company_id (nullable), published_at.
- `documents` — uploaded files, metadata, owner, public flag, related company or post.
- `stock_snapshots` — cached snapshots for quick public display.

Security Model
--------------
- Authentication via Supabase OAuth (Google) for admins.
- Authorization enforced server-side via Supabase RLS and server-side guards for admin-only routes.
- Secrets and API keys never exposed to client bundles; server route handlers proxy stock API calls.

Document Upload Model
---------------------
- Supabase Storage bucket `company-documents`.
- Documents have `public` boolean; public files are readable by anonymous users per bucket policies.
- Admins can upload, update metadata, and delete documents.

Stock Data Model
----------------
- Use Alpha Vantage for historical/quote data, but proxy requests server-side.
- Provide mock fallback data when API key is missing or Supabase is not configured.
- Cache snapshots in `stock_snapshots` to limit external calls and support quick rendering.

Future AI/Research Features (non-MVP)
------------------------------------
- AI-assisted summaries and highlights of analysis posts.
- Automated thesis checks, citation extraction, and related-company suggestions.
- Sentiment / language analysis and indexing for semantic search.
