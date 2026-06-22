import { z } from "zod";

export const showcaseItemIdSchema = z.uuid();

export const createShowcaseItemSchema = z.object({
  title: z.string().trim().min(1, "Title is required.").max(120),
  description: z.string().trim().max(1000).optional()
});

export const updateShowcaseItemSchema = createShowcaseItemSchema
  .partial()
  .extend({ completed: z.boolean().optional() })
  .refine((value) => Object.keys(value).length > 0, "Provide at least one field.");

export interface ShowcaseAttachment {
  originalName: string;
  mimeType: string;
  sizeBytes: number;
  url: string;
}

export interface ShowcaseItem {
  id: string;
  title: string;
  description: string | null;
  completed: boolean;
  attachment: ShowcaseAttachment | null;
  createdAt: string;
  updatedAt: string;
}

export type CreateShowcaseItemInput = z.infer<typeof createShowcaseItemSchema>;
export type UpdateShowcaseItemInput = z.infer<typeof updateShowcaseItemSchema>;
