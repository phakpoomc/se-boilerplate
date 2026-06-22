---
name: database-usage
description: Work with Prisma and the local SQLite database, including schema changes, migrations, seed data, repositories, and shared client access.
---

# Database Usage

Use Prisma through `@starter/db`; never create ad hoc clients in feature modules.

- Edit `packages/db/prisma/schema.prisma`.
- Create migrations with `pnpm db:migrate -- --name <clear-name>`.
- Use UUID defaults for public identifiers.
- Use transactions for workflows containing multiple dependent writes.
- Keep database access in API repositories.
- Make seed logic idempotent.
- Run `pnpm db:validate`, `pnpm db:generate`, and relevant tests.

SQLite is the default classroom database. Revisit concurrency and migration strategy before a
project moves to multi-instance production hosting.
