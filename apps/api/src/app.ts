import { mkdir } from "node:fs/promises";
import compression from "compression";
import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import { env, publicDirectory, uploadDirectory } from "./common/config/env";
import { errorHandler } from "./common/middleware/error-handler";
import { healthRouter } from "./modules/health/health.routes";
import { showcaseItemsRouter } from "./modules/showcase-items/showcase-items.routes";

export async function createApp() {
  await mkdir(uploadDirectory, { recursive: true });

  const app = express();
  app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
  app.use(cors({ origin: env.CLIENT_URL }));
  app.use(compression());
  app.use(express.json({ limit: "1mb" }));
  app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 500 }));
  app.use("/uploads", express.static(uploadDirectory, { index: false, fallthrough: false }));
  app.use(express.static(publicDirectory));

  app.use("/health", healthRouter);
  app.use("/api/showcase-items", showcaseItemsRouter);
  app.use(errorHandler);

  return app;
}
