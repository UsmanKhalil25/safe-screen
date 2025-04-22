import { z } from "zod";

export const paginationSchema = z.object({
  totalItems: z.number(),
  totalPages: z.number(),
  currentPage: z.number(),
  itemsPerPage: z.number(),
});
