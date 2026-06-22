# Architecture

Use a TypeScript modular monolith.

Backend modules live in `apps/api/src/modules/<module>` and follow:

```text
route -> validation/middleware -> controller -> service -> repository -> database
```

Frontend features live in `apps/web/src/features/<feature>`. Keep their components, hooks, pages,
schemas, and services together. Route files should compose pages rather than hold business logic.

Put contracts used by both apps in `packages/shared`. Access Prisma only through `@starter/db`.
Keep shadcn/ui source components in `apps/web/src/components/ui`; do not add a separate UI package
until the project has a demonstrated need for one.
