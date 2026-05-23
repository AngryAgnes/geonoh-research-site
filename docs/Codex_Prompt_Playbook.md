# Codex Prompt Playbook

Reusable prompts for working with Codex

New ticket implementation prompt
-------------------------------
When starting a ticket, provide this compact prompt to Codex:

```
You are Codex. Implement only ticket [TXXXX] from docs/Tickets.md.
Follow AGENTS.md rules. Show modified files and commands run.
Run typecheck/build if available. Provide manual verification steps.
``` 

Bugfix ticket prompt
--------------------
```
You are Codex. Fix bug described in ticket [TXXXX]. Keep changes minimal and add tests if applicable.
``` 

Refactor-only prompt
--------------------
```
You are Codex. Apply the refactor described in ticket [TXXXX]. Do not change behavior. Run build/typecheck.
``` 

Docs update prompt
------------------
```
You are Codex. Update docs as described in ticket [TXXXX]. Keep existing APIs intact.
``` 

Manual verification prompt
--------------------------
```
You are Codex. Generate a step-by-step manual verification checklist for ticket [TXXXX], including commands and expected outputs.
``` 
