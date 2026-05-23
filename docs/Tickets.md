# Tickets

This file contains a prioritized list of tickets for the MVP. Each ticket is atomic and must be implemented alone.

T0000 — Planning Docs and Repo Rules
- Goal: Create planning docs, AGENTS rules, SQL planning, and env example.
- Dependencies: none
- Allowed areas: docs/, supabase/, README.md, AGENTS.md, .env.example
- Do not touch: app/ (if exists), package.json
- Requirements: Add planning docs and SQL files listed in project spec.
- Non-goals: Implement Next.js app
- Acceptance: All listed files present and coherent.
- Manual verification: Check files exist and read contents.

T0001 — Initialize Next.js App Skeleton
- Goal: Create Next.js + TypeScript + Tailwind skeleton
- Dependencies: T0000
- Allowed areas: project root, app/, package.json, tailwind config
- Do not touch: supabase/ planning files
- Requirements: Minimal scaffold with example page and scripts
- Non-goals: Full feature implementation
- Acceptance: `npm run dev` starts and shows example app.
- Manual verification: Start dev server.

T0002 — Base Layout, Theme, Header, Footer
- Goal: Add layout, global styles, and core UI shell
- Dependencies: T0001
- Allowed areas: app/, components/, styles/
- Do not touch: server auth code
- Requirements: Persistent header/footer
- Non-goals: Connect to Supabase
- Acceptance: Layout renders on pages
- Manual verification: Visit home page

T0003 — Demo Data and Core Types
- Goal: Add demo JSON data and TypeScript types for companies, posts, docs
- Dependencies: T0001
- Allowed areas: src/lib/demo, src/types
- Do not touch: production DB code
- Requirements: Demo data to support public pages before Supabase
- Acceptance: Public pages render using demo data when no DB
- Manual verification: Toggle demo mode and view pages

T0004 — Public Home Page
T0005 — Public Analysis Index Page
T0006 — Public Analysis Detail Page
T0007 — Public Company Page
T0008 — Documents Library Page with Demo Data
T0009 — Supabase Client Setup
T0010 — Supabase Schema and RLS Implementation
T0011 — Admin Auth and Login Page
T0012 — Server-Side Admin Guard
T0013 — Admin Dashboard
T0014 — Manage Companies Admin Page
T0015 — Create/Edit Analysis Admin Page
T0016 — Document Upload Admin Page
T0017 — Public Document Download Flow
T0018 — Stock API Route with Mock Fallback
T0019 — Stock Snapshot and Chart Components
T0020 — Connect Public Pages to Supabase Data
T0021 — Empty/Loading/Error States
T0022 — README Setup Finalization
T0023 — Production Build and Deployment Prep

For each ticket above, use `docs/Codex_Ticket_Handoff_Template.md` when starting work and follow `AGENTS.md` rules.
