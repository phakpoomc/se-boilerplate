# AI Instructions

This repository uses provider-neutral project instructions in `docs/ai`.

Before changing code, read:

- `docs/ai/PROJECT_CONTEXT.md`
- `docs/ai/ARCHITECTURE.md`
- `docs/ai/CODING_RULES.md`
- `docs/ai/WORKFLOW.md`
- `docs/ai/MODULE_GUIDE.md`
- `docs/ai/SECURITY_RULES.md`
- `docs/ai/DEPLOYMENT_RULES.md`
- `docs/ai/BACKUP_RULES.md`

Keep provider-specific adapter files short and update shared rules in `docs/ai`.

Treat the directory containing this file as the repository boundary. Do not inherit implementation
rules from a parent project if this starter is temporarily nested inside another checkout.
