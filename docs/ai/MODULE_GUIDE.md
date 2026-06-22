# Module Guide

| Module | API path | API folder | Web feature | Purpose |
|---|---|---|---|---|
| Health | `/health` | `apps/api/src/modules/health` | — | Basic API readiness |
| Showcase Items | `/api/showcase-items` | `apps/api/src/modules/showcase-items` | `apps/web/src/features/showcase` | Example CRUD and local attachments |

When adding a real feature, create one backend module and one mirrored frontend feature. Add its
public request/response contract to `packages/shared` when both sides consume it.
