import { prisma, type ShowcaseItem as DatabaseShowcaseItem } from "@starter/db";
import type { CreateShowcaseItemInput, ShowcaseItem, UpdateShowcaseItemInput } from "@starter/shared";

export interface StoredAttachment {
  storedName: string;
  originalName: string;
  mimeType: string;
  sizeBytes: number;
}

function toShowcaseItem(item: DatabaseShowcaseItem): ShowcaseItem {
  const attachment = item.attachmentStoredName && item.attachmentOriginalName && item.attachmentMimeType && item.attachmentSizeBytes !== null
    ? {
        originalName: item.attachmentOriginalName,
        mimeType: item.attachmentMimeType,
        sizeBytes: item.attachmentSizeBytes,
        url: `/uploads/${item.attachmentStoredName}`
      }
    : null;

  return {
    id: item.id,
    title: item.title,
    description: item.description,
    completed: item.completed,
    attachment,
    createdAt: item.createdAt.toISOString(),
    updatedAt: item.updatedAt.toISOString()
  };
}

export const showcaseItemsRepository = {
  async list() {
    const items = await prisma.showcaseItem.findMany({ orderBy: { createdAt: "desc" } });
    return items.map(toShowcaseItem);
  },

  async findDatabaseItem(id: string) {
    return prisma.showcaseItem.findUnique({ where: { id } });
  },

  async create(input: CreateShowcaseItemInput) {
    const item = await prisma.showcaseItem.create({
      data: {
        title: input.title,
        description: input.description || null
      }
    });
    return toShowcaseItem(item);
  },

  async update(id: string, input: UpdateShowcaseItemInput) {
    const item = await prisma.showcaseItem.update({
      where: { id },
      data: {
        ...input,
        description: input.description === "" ? null : input.description
      }
    });
    return toShowcaseItem(item);
  },

  async setAttachment(id: string, attachment: StoredAttachment) {
    const item = await prisma.showcaseItem.update({
      where: { id },
      data: {
        attachmentStoredName: attachment.storedName,
        attachmentOriginalName: attachment.originalName,
        attachmentMimeType: attachment.mimeType,
        attachmentSizeBytes: attachment.sizeBytes
      }
    });
    return toShowcaseItem(item);
  },

  async clearAttachment(id: string) {
    const item = await prisma.showcaseItem.update({
      where: { id },
      data: {
        attachmentStoredName: null,
        attachmentOriginalName: null,
        attachmentMimeType: null,
        attachmentSizeBytes: null
      }
    });
    return toShowcaseItem(item);
  },

  async delete(id: string) {
    return prisma.showcaseItem.delete({ where: { id } });
  }
};
