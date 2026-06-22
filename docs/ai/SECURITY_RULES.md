# Security Rules

- Validate API body, params, and query values with Zod.
- Use Prisma or parameterized queries; never interpolate raw SQL.
- Validate upload content from magic bytes, not extensions or browser MIME claims.
- Keep uploaded filenames server-generated and use `path.basename` before filesystem operations.
- Enforce upload size and type allowlists.
- Do not store secrets in Git or expose server environment values to the browser.
- Escape or safely render untrusted text; do not inject user HTML.
- Add authentication and authorization before introducing private data or protected actions.
- Remember that the starter upload directory is public by design.
