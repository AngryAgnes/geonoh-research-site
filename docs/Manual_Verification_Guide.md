# Manual Verification Guide

General verification checklist
- Run build/typecheck/lint (if present)
- Verify pages render with demo fallback data
- Verify admin login flow (once implemented) and server-side guard
- Verify uploads and public downloads (once implemented)

Per-ticket verification
- Each ticket must include manual verification steps in its PR and follow this checklist:
  - Commands to run
  - Files changed
  - Expected UI behavior
  - Any necessary environment variables

Admin login verification
- Open `/admin` and confirm redirect to Supabase Google OAuth.
- After login, confirm server-side session is established and admin routes return 200.

Upload document verification
- Login as admin, navigate to upload page, upload sample PDF.
- Mark public and verify public download URL works anonymously.

Public download verification
- Visit documents index and click public document link; verify file downloads without auth.

Stock mock fallback verification
- With `ALPHA_VANTAGE_API_KEY` missing, request stock route and verify deterministic mock payload.

Supabase disconnected fallback verification
- With no Supabase config, public pages must render demo content and not crash.

Build verification
- Run `npm run build` (after scaffold) and ensure no type errors and server routes compile.
