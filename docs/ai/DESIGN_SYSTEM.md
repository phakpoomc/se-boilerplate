# Design System

This file is intentionally editable. Define the project's visual direction here before building
many screens.

## Current neutral starting point

- Use the shadcn/ui Radix Nova components in `apps/web/src/components/ui`.
- Use semantic theme tokens such as `bg-background`, `text-foreground`, and `text-muted-foreground`.
- Use Geist as the temporary typeface.
- Keep layouts responsive, readable, and restrained.
- Use clear labels, visible focus states, and touch-friendly controls.
- Show loading, empty, error, success, validation, and disabled states.
- Use Sonner for transient feedback and AlertDialog for destructive confirmation.

## Replace for your project

Document the intended audience, language, colors, typography, spacing, layout density, icon style,
motion, accessibility targets, and examples of interfaces to emulate or avoid.

When changing the shadcn theme, update `apps/web/src/styles/globals.css` and `components.json`.
Use the shadcn CLI to add components instead of copying unknown component code manually.
