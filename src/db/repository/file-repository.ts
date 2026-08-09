import { and, asc, count, desc, eq, inArray, like } from "drizzle-orm";

import type { getDb } from "@/db";
import { files } from "@/db/schema/files";
import type {
	CreateFileInput,
	FileRecord,
	ListFilesQuery,
} from "@/lib/contracts/files";

const sortableColumns = {
	fileName: files.fileName,
	status: files.status,
	sizeBytes: files.sizeBytes,
	createdAt: files.createdAt,
} as const;

export type ListFilesInput = ListFilesQuery & { ownerId: string };

export type ListFilesResult = {
	files: FileRecord[];
	total: number;
};

export interface FileRepository {
	create(input: CreateFileInput): Promise<FileRecord>;
	list(input: ListFilesInput): Promise<ListFilesResult>;
}

export class DrizzleFileRepository implements FileRepository {
	constructor(private readonly db: ReturnType<typeof getDb>) {}

	async create(input: CreateFileInput): Promise<FileRecord> {
		const [record] = await this.db.insert(files).values(input).returning({
			id: files.id,
			fileName: files.fileName,
			mimeType: files.mimeType,
			sizeBytes: files.sizeBytes,
			status: files.status,
			createdAt: files.createdAt,
		});

		return record;
	}

	async list(input: ListFilesInput): Promise<ListFilesResult> {
		const conditions = [eq(files.ownerId, input.ownerId)];

		if (input.status && input.status.length > 0) {
			conditions.push(inArray(files.status, input.status));
		}

		if (input.search) {
			conditions.push(like(files.fileName, `%${input.search}%`));
		}

		const where = and(...conditions);

		const sortColumn = sortableColumns[input.sortBy ?? "createdAt"];
		const orderBy =
			input.sortDir === "asc" ? asc(sortColumn) : desc(sortColumn);

		const [rows, [{ total }]] = await Promise.all([
			this.db
				.select({
					id: files.id,
					fileName: files.fileName,
					mimeType: files.mimeType,
					sizeBytes: files.sizeBytes,
					status: files.status,
					createdAt: files.createdAt,
				})
				.from(files)
				.where(where)
				.orderBy(orderBy)
				.limit(input.pageSize)
				.offset(input.page * input.pageSize),
			this.db.select({ total: count() }).from(files).where(where),
		]);

		return { files: rows, total };
	}
}
