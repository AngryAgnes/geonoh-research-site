# AGENTS.md

Repo-level Codex rules (enforced)

- Implement one ticket only. Open a branch/PR per ticket.
- Do not implement future-ticket features or scaffold beyond the ticket.
- Do not refactor unrelated files or change global architecture unless the ticket explicitly requires it.
- Avoid unnecessary dependencies; prefer native APIs and lightweight libs.
- Use strict TypeScript and enable `--noImplicitAny`/`--strict` where possible.
- Keep backend/server logic separate from UI components.
- Never expose server secrets to client code (use server-side route handlers and environment variables).
- Use server-side admin checks and Supabase RLS policies for authorization enforcement.
- Use a clean data access layer (thin repository/service functions) — keep SQL and queries isolated.
- Run build/typecheck/lint when possible before marking a ticket done.
- In every PR, report files changed, commands run, build results, manual verification steps, risks, and follow-up tickets.
- Update `docs/Repo_Current_State.md` after completing each ticket.
