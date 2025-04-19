import { z } from "zod";

export const fileSchema = z.object({
  id: z.string(),
  name: z.string(),
  mimetype: z.string(),
  path: z.string(),
  size: z.number(),
  userId: z.string(),
  createdAt: z.string().transform((date) => new Date(date)),
  updatedAt: z.string().transform((date) => new Date(date)),
});
