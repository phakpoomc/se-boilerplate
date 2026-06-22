import { sendOk } from "../../common/http/responses";
import { asyncHandler } from "../../common/middleware/async-handler";
import { showcaseItemsService } from "./showcase-items.service";

export const showcaseItemsController = {
  list: asyncHandler(async (_request, response) => {
    return sendOk(response, "Showcase items loaded.", await showcaseItemsService.list());
  }),

  create: asyncHandler(async (request, response) => {
    return sendOk(response, "Showcase item created.", await showcaseItemsService.create(request.body), 201);
  }),

  update: asyncHandler(async (request, response) => {
    return sendOk(response, "Showcase item updated.", await showcaseItemsService.update(request.params.id as string, request.body));
  }),

  delete: asyncHandler(async (request, response) => {
    await showcaseItemsService.delete(request.params.id as string);
    return sendOk(response, "Showcase item deleted.", null);
  }),

  attach: asyncHandler(async (request, response) => {
    return sendOk(response, "Attachment uploaded.", await showcaseItemsService.attach(request.params.id as string, request.file));
  }),

  removeAttachment: asyncHandler(async (request, response) => {
    return sendOk(response, "Attachment removed.", await showcaseItemsService.removeAttachment(request.params.id as string));
  })
};
