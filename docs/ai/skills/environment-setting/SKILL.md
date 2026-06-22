---
name: environment-setting
description: Configure local environment values and beginner-friendly setup for the pnpm workspace, Express API, SQLite database, Vite app, and local upload folder.
---

# Environment Setting

- Keep API defaults in `apps/api/.env.example`.
- Never commit `apps/api/.env`.
- Use `VITE_` variables only for values safe to expose in browsers.
- Update Zod validation in `apps/api/src/common/config/env.ts` with every environment change.
- Keep `pnpm run setup` idempotent and safe for a fresh clone.
- Avoid requiring Docker, Redis, cloud storage, or an external database for local development.
