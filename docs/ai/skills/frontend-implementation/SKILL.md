---
name: frontend-implementation
description: Build or update React and Vite features using TanStack Router, TanStack Query, Tailwind CSS, and shadcn/ui source components in apps/web.
---

# Frontend Implementation

Read `docs/ai/DESIGN_SYSTEM.md` before visual work.

- Work in `apps/web/src/features/<feature>`.
- Keep API functions in feature-local `services` and server-state hooks in feature-local `hooks`.
- Keep route files limited to page composition.
- Search installed shadcn components before writing a primitive.
- Add official components with `pnpm dlx shadcn@latest add <component>` from `apps/web`.
- Use semantic theme tokens and shadcn variants instead of hard-coded component colors.
- Use `FieldGroup` and `Field` for forms, Sonner for feedback, and AlertDialog for destructive actions.
- Include accessible labels, keyboard/focus behavior, responsive layout, and all asynchronous states.
