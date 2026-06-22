---
name: api-implementation
description: Implement or review Express TypeScript API modules in apps/api, including routes, controllers, services, repositories, validation, and response behavior.
---

# API Implementation

Work inside `apps/api/src/modules/<module>`.

1. Define shared Zod contracts in `packages/shared` when the web app consumes them.
2. Keep routes thin and attach validation or upload middleware there.
3. Limit controllers to HTTP orchestration.
4. Put business rules and multi-step workflows in services.
5. Put Prisma reads and writes in repositories.
6. Return the shared `ApiResponse<T>` shape.
7. Add focused tests for success and failure paths.
8. Document new public routes in the module README or module guide.
