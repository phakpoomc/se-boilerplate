---
name: cartography
description: Choose file and folder locations in the student starter monorepo. Use when creating, moving, or finding API, web, database, shared contract, documentation, or agent-skill files.
---

# Cartography

Use the nearest ancestor containing this starter's `AGENTS.md` and `package.json` as the repository
root. Do not inspect or apply rules from a parent checkout outside that boundary.

- API modules: `apps/api/src/modules/<module>`
- API infrastructure: `apps/api/src/common`
- Frontend features: `apps/web/src/features/<feature>`
- shadcn/ui source: `apps/web/src/components/ui`
- Shared contracts: `packages/shared/src`
- Prisma schema, migration, and seed: `packages/db/prisma`
- Provider-neutral project guidance: `docs/ai`
- Discoverable project skills: `.agents/skills`

Keep `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, and Copilot instructions as thin adapters.
