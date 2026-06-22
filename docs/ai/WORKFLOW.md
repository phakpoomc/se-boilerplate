# Workflow

1. Read the relevant project skill and `docs/ai/MODULE_GUIDE.md`.
2. Update shared contracts first when both API and web need the same shape.
3. Keep API changes inside the owning module and frontend changes inside its mirrored feature.
4. Add a Prisma migration for schema changes and update seed data only when useful.
5. Update documentation when routes, setup, storage, or architecture change.
6. Run focused checks, then:

```bash
pnpm db:validate
pnpm typecheck
pnpm test
pnpm build
```
