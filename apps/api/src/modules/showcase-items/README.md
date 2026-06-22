# Showcase Items

Teaching module for CRUD and optional local attachments.

- `GET /api/showcase-items`
- `POST /api/showcase-items`
- `PATCH /api/showcase-items/:id`
- `DELETE /api/showcase-items/:id`
- `POST /api/showcase-items/:id/attachment`
- `DELETE /api/showcase-items/:id/attachment`

Attachments accept PNG, JPEG, WebP, and PDF content up to 5 MB and are served publicly from
`/uploads/<generated-name>`.
