---
name: storage-handler
description: Implement or review beginner-friendly local public-folder uploads, including multipart handling, magic-byte validation, generated filenames, metadata, URLs, replacement, and cleanup.
---

# Storage Handler

Use `apps/api/public/uploads` and serve it from `/uploads`.

- Treat every uploaded file as untrusted.
- Enforce the configured byte limit in multipart middleware.
- Detect the real content type with `file-type`.
- Use a narrow allowlist; the starter allows PNG, JPEG, WebP, and PDF.
- Generate stored names with UUIDs and known extensions.
- Keep the sanitized original name only as display metadata.
- Use `path.basename` and never join a user-controlled storage path.
- Delete replaced and removed files, and compensate if a database update fails.
- State clearly that these files are public and unsuitable for secrets.
