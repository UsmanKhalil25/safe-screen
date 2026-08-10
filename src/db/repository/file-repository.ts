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

export type FileForDownload = {
	id: string;
	fileName: string;
	mimeType: string;
	storageKey: string;
};

export interface FileRepository {
	create(input: CreateFileInput): Promise<FileRecord>;
	list(input: ListFilesInput): Promise<ListFilesResult>;
	softDelete(ids: string[], ownerId: string): Promise<number>;
	rename(
		id: string,
		ownerId: string,
		fileName: string,
	): Promise<FileRecord | null>;
	findManyForDownload(
		ids: string[],
		ownerId: string,
	): Promise<FileForDownload[]>;
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

		if (input.status) {
			conditions.push(eq(files.status, input.status));
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

	async softDelete(ids: string[], ownerId: string): Promise<number> {
		const rows = await this.db
			.update(files)
			.set({ status: "deleted" })
			.where(and(eq(files.ownerId, ownerId), inArray(files.id, ids)))
			.returning({ id: files.id });

		return rows.length;
	}

	async rename(
		id: string,
		ownerId: string,
		fileName: string,
	): Promise<FileRecord | null> {
		const [record] = await this.db
			.update(files)
			.set({ fileName })
			.where(and(eq(files.id, id), eq(files.ownerId, ownerId)))
			.returning({
				id: files.id,
				fileName: files.fileName,
				mimeType: files.mimeType,
				sizeBytes: files.sizeBytes,
				status: files.status,
				createdAt: files.createdAt,
			});

		return record ?? null;
	}

	async findManyForDownload(
		ids: string[],
		ownerId: string,
	): Promise<FileForDownload[]> {
		return this.db
			.select({
				id: files.id,
				fileName: files.fileName,
				mimeType: files.mimeType,
				storageKey: files.storageKey,
			})
			.from(files)
			.where(and(eq(files.ownerId, ownerId), inArray(files.id, ids)));
	}
}
