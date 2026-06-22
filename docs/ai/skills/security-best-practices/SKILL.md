---
name: security-best-practices
description: Review or implement secure defaults for the TypeScript React, Express, Prisma SQLite, and local-upload code used by this student starter.
---

# Security Best Practices

Apply `docs/ai/SECURITY_RULES.md`.

Prioritize trust boundaries: request validation, filesystem paths, uploads, database queries,
rendered user content, environment values, and error responses. Report concrete findings with file
and line references. Prefer small fixes with focused regression tests.
