import type { CreateShowcaseItemInput, UpdateShowcaseItemInput } from "@starter/shared";
import { ApiError } from "../../common/http/api-error";
import { showcaseItemsRepository } from "./showcase-items.repository";
import { removeAttachment, saveAttachment } from "./showcase-items.storage";

async function requireItem(id: string) {
  const item = await showcaseItemsRepository.findDatabaseItem(id);
  if (!item) {
    throw new ApiError(404, "Showcase item not found.");
  }
  return item;
}

export const showcaseItemsService = {
  list: () => showcaseItemsRepository.list(),
  create: (input: CreateShowcaseItemInput) => showcaseItemsRepository.create(input),

  async update(id: string, input: UpdateShowcaseItemInput) {
    await requireItem(id);
    return showcaseItemsRepository.update(id, input);
  },

  async delete(id: string) {
    const existing = await requireItem(id);
    await showcaseItemsRepository.delete(id);
    await removeAttachment(existing.attachmentStoredName);
  },

  async attach(id: string, file: Express.Multer.File | undefined) {
    const existing = await requireItem(id);
    if (!file) {
      throw new ApiError(400, "Choose an attachment to upload.");
    }

    const attachment = await saveAttachment(file);
    try {
      const item = await showcaseItemsRepository.setAttachment(id, attachment);
      await removeAttachment(existing.attachmentStoredName);
      return item;
    } catch (error) {
      await removeAttachment(attachment.storedName);
      throw error;
    }
  },

  async removeAttachment(id: string) {
    const existing = await requireItem(id);
    const item = await showcaseItemsRepository.clearAttachment(id);
    await removeAttachment(existing.attachmentStoredName);
    return item;
  }
};
