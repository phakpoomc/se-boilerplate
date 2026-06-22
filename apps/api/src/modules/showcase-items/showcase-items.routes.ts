import { Router } from "express";
import multer from "multer";
import { z } from "zod";
import { createShowcaseItemSchema, showcaseItemIdSchema, updateShowcaseItemSchema } from "@starter/shared";
import { env } from "../../common/config/env";
import { validateRequest } from "../../common/middleware/validate-request";
import { showcaseItemsController } from "./showcase-items.controller";

const itemParamsSchema = z.object({ id: showcaseItemIdSchema });
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: env.MAX_UPLOAD_BYTES, files: 1 }
});

export const showcaseItemsRouter = Router();

showcaseItemsRouter.get("/", showcaseItemsController.list);
showcaseItemsRouter.post("/", validateRequest({ body: createShowcaseItemSchema }), showcaseItemsController.create);
showcaseItemsRouter.patch("/:id", validateRequest({ params: itemParamsSchema, body: updateShowcaseItemSchema }), showcaseItemsController.update);
showcaseItemsRouter.delete("/:id", validateRequest({ params: itemParamsSchema }), showcaseItemsController.delete);
showcaseItemsRouter.post(
  "/:id/attachment",
  validateRequest({ params: itemParamsSchema }),
  upload.single("attachment"),
  showcaseItemsController.attach
);
showcaseItemsRouter.delete(
  "/:id/attachment",
  validateRequest({ params: itemParamsSchema }),
  showcaseItemsController.removeAttachment
);
