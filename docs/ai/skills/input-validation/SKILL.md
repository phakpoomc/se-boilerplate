---
name: input-validation
description: Add or review Zod validation for API requests, shared contracts, frontend forms, URL parameters, and environment variables.
---

# Input Validation

Validate at trust boundaries.

- Put cross-app schemas in `packages/shared`.
- Validate API body, params, and query values in routes.
- Validate frontend forms for useful immediate feedback, then validate again in the API.
- Validate environment variables in `apps/api/src/common/config/env.ts`.
- Return understandable messages without exposing internals.
- Do not treat browser validation as a security boundary.
