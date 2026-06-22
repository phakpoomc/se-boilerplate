# Coding Rules

- Use TypeScript and strict type checking.
- Prefer small feature-local files over global controller, service, or API buckets.
- Validate requests, forms, environment values, and shared contracts with Zod.
- Use `@starter/shared` for cross-app contracts and `@starter/db` for Prisma access.
- Use opaque UUIDs for externally visible records.
- Return meaningful error responses and visible frontend feedback.
- Handle loading, empty, error, success, and disabled states.
- Prefer maintained libraries and installed shadcn components over custom primitives.
- Keep naming and user-facing copy clear and neutral unless the project defines another language.
