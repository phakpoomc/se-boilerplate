---
name: web-test
description: Verify API, frontend, SQLite, local-upload, setup, and workspace changes in the student project boilerplate.
---

# Web Test

Run focused checks first, then:

```bash
pnpm db:validate
pnpm typecheck
pnpm test
pnpm build
```

For setup changes, test `pnpm run setup` twice from a clean copy. For upload changes, cover valid
content, spoofed files, size limits, missing records, replacement, and cleanup. For UI changes,
inspect desktop and mobile widths and check loading, empty, error, success, and disabled states.
