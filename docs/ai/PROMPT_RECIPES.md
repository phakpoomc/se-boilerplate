# Prompt Recipes

## Add a feature

Read the architecture and module guide. Create a backend module and mirrored frontend feature,
update shared contracts first, add tests, and verify the workspace.

## Change the database

Use the database skill, edit `packages/db/prisma/schema.prisma`, create a named Prisma migration,
update seed data if helpful, and run database validation plus tests.

## Add an upload

Use the storage skill. Define a strict allowlist and size limit, validate magic bytes, generate the
stored filename on the server, and test spoofed, oversized, replacement, and deletion cases.

## Design a page

First replace `docs/ai/DESIGN_SYSTEM.md` with the project's visual direction. Then use the frontend
skill and compose installed shadcn components with responsive and accessible states.
