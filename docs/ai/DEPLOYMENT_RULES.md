# Deployment Rules

This starter intentionally includes no production deployment template.

Before deploying a student project:

1. Build and test with the production Node version.
2. Run Prisma migrations before starting the API.
3. Serve the web build and proxy `/api`, `/health`, and `/uploads` to the API.
4. Use persistent writable paths for the SQLite database and upload directory.
5. Use HTTPS and production environment variables.
6. Add a process manager and health check appropriate to the hosting platform.

SQLite and local uploads fit a single-server classroom project. Reassess them before scaling to
multiple application instances.
