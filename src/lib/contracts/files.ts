import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { files } from "@/db/schema/files";

export const insertFileSchema = createInsertSchema(files, {
	fileName: (schema) => schema.min(1),
	mimeType: (schema) => schema.min(1),
	sizeBytes: (schema) => schema.positive(),
	storageKey: (schema) => schema.min(1),
}).pick({
	ownerId: true,
	fileName: true,
	mimeType: true,
	sizeBytes: true,
	storageKey: true,
});

export type CreateFileInput = z.infer<typeof insertFileSchema>;

export const fileSchema = createSelectSchema(files).pick({
	id: true,
	fileName: true,
	mimeType: true,
	sizeBytes: true,
	status: true,
	createdAt: true,
});

export type FileRecord = z.infer<typeof fileSchema>;

export const PAGE_SIZE_OPTIONS = [5, 10, 15, 20, 25] as const;
export const DEFAULT_PAGE_SIZE: (typeof PAGE_SIZE_OPTIONS)[number] = 10;

export const listFilesQuerySchema = z.object({
	page: z.coerce.number().int().min(0).default(0),
	pageSize: z.coerce
		.number()
		.int()
		.refine(
			(value): value is (typeof PAGE_SIZE_OPTIONS)[number] =>
				(PAGE_SIZE_OPTIONS as readonly number[]).includes(value),
			{ message: "Invalid page size" },
		)
		.default(DEFAULT_PAGE_SIZE),
	status: z.array(z.enum(["active", "deleted"])).optional(),
	search: z.string().trim().min(1).optional(),
	sortBy: z
		.enum(["fileName", "status", "sizeBytes", "createdAt"])
		.default("createdAt"),
	sortDir: z.enum(["asc", "desc"]).default("desc"),
});

export type ListFilesQuery = z.infer<typeof listFilesQuerySchema>;

export const SORT_COLUMNS = [
	{ value: "fileName", label: "Name" },
	{ value: "status", label: "Status" },
	{ value: "sizeBytes", label: "Size" },
	{ value: "createdAt", label: "Uploaded" },
] as const satisfies { value: ListFilesQuery["sortBy"]; label: string }[];
