# Student Project Boilerplate

A small full-stack starter for student projects. It includes:

- React, Vite, TanStack Router, and TanStack Query
- Tailwind CSS and shadcn/ui source components
- Express and Zod
- Prisma with a local SQLite database
- Validated local file uploads
- Provider-neutral AI instructions and project skills

สำหรับนักศึกษาที่ใช้ Windows โปรดอ่าน
[คู่มือการสร้างโปรเจกต์ฉบับภาษาไทย](docs/STUDENT_GUIDE_TH.md)
ตั้งแต่การติดตั้งโปรแกรม การสำรวจโครงสร้างและเทคโนโลยีใน repo การใช้ Git
ไปจนถึงตัวอย่าง prompt สำหรับทำงานร่วมกับ AI

## Start

Install Node.js 22 and enable Corepack, then run:

```bash
corepack enable
pnpm install
pnpm run setup
pnpm dev
```

Open <http://localhost:5173>. The API runs at <http://localhost:4100>.

`pnpm run setup` is safe to run again. It creates `apps/api/.env` and `apps/web/.env`, prepares the
upload directory, generates Prisma Client, applies migrations, and seeds sample records. The word
`run` is required because `pnpm setup` is already a pnpm command for configuring the package
manager.

Keep `PORT` in `apps/api/.env` and the port in `VITE_API_URL` inside `apps/web/.env` aligned. Restart
`pnpm dev` after changing either file. If a development port is already occupied, the command stops
with a clear port-conflict message instead of opening on another project's server.

## Workspace

```text
apps/
  api/       Express API and local public uploads
  web/       React application and shadcn/ui components
packages/
  db/        Prisma schema, migration, seed, and client
  shared/    Shared Zod schemas and TypeScript contracts
docs/ai/     Project instructions used by coding agents
```

The `showcase-items` feature is intentionally replaceable. It demonstrates one complete path from
a responsive form to validation, API layers, SQLite persistence, and local attachment storage.

## Useful commands

```bash
pnpm typecheck
pnpm test
pnpm build
pnpm db:validate
pnpm db:migrate
```

Before designing your real interface, replace the choices in `docs/ai/DESIGN_SYSTEM.md`.

## Important limitation

Files under `apps/api/public/uploads` are publicly accessible. This is convenient for classroom
projects but is not appropriate for private or sensitive production documents.
