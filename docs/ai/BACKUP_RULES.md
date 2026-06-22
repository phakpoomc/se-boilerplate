# Backup Rules

- Back up `packages/db/prisma/dev.db` and `apps/api/public/uploads` together.
- Stop writes or use SQLite's backup facilities before copying an active database.
- Store backups outside the application directory.
- Never commit databases, uploaded files, backup archives, or secrets.
- Test restoration before relying on a backup process.
