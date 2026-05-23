# Repo Current State

- Current branch: `t0004-public-home-page`
- Completed tickets: T0000 (planning docs added), T0001 (Next.js scaffold initialized), T0002 (base layout, header, footer), T0002A (placeholder navigation pages), T0003 (demo data and core types), T0004 (public home page), T0004A (homepage styling and Tailwind setup fix)
- Current app status: Minimal Next.js + TypeScript + Tailwind scaffold present in `src/`, with a persistent header/footer shell, placeholder pages for `/analysis`, `/companies`, `/documents`, and `/admin`, typed demo research data under `src/lib/demo-data/`, and a polished public homepage using that demo data.
- Installed dependencies: declared dependencies are installed locally; `node_modules/` and `package-lock.json` are present.
- Available scripts: `dev`, `build`, `start`, `lint`, `typecheck` (see `package.json`).
- Demo data status: core TypeScript types are in `src/types/research.ts`; demo companies, analysis posts, research documents, thesis updates, stock snapshots, and lookup helpers are exported from `src/lib/demo-data/`.
- Tailwind status: `src/app/layout.tsx` imports `./globals.css`; `src/app/globals.css` includes Tailwind base/components/utilities and base-layer body/link styling; `tailwind.config.cjs` scans `src/app`, `src/components`, and `src/lib` for `js`, `ts`, `jsx`, `tsx`, and `mdx` files.
- Build/typecheck status: after stopping the prior dev server and removing `.next`, `npm run typecheck` passed and `npm run build` passed for T0004A on 2026-05-23.
- Local dev verification: During T0004A verification, a fresh Next.js dev server served this app at `http://localhost:3000`. The home page and `/analysis`, `/companies`, `/documents`, and `/admin` returned `200`. The homepage HTML linked the generated global CSS, and the CSS endpoint returned `200` with Tailwind utilities present.
- Known issues:
  - Supabase not configured
  - Google OAuth not configured
  - Admin is only a placeholder; no auth or dashboard behavior exists yet
  - Document upload/download, analysis CRUD, stock API, and data layer are not implemented yet
  - Demo data is static and intentionally not connected to Supabase or live market data
- Next recommended ticket: T0005 — Public Analysis Index Page
