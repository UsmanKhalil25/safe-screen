import { z } from "zod";
import { paginationSchema } from "./pagination.schema";

export type PaginationSchema = z.infer<typeof paginationSchema>;
