"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import { getDb } from "@/db";
import { DrizzleFileRepository } from "@/db/repository/file-repository";
import { getAuth } from "@/lib/auth";
import {
	deleteFilesSchema,
	insertFileSchema,
	updateFileSchema,
	uploadFileMetaSchema,
	type FileRecord,
} from "@/lib/contracts/files";
import { createEntityId } from "@/lib/entity-ids";
import { buildStorageKey, getFileStorage } from "@/lib/storage";

async function requireSession() {
	const auth = await getAuth();
	const session = await auth.api.getSession({ headers: await headers() });

	if (!session) {
		throw new Error("Unauthorized");
	}

	return session;
}

export async function uploadFileAction(file: File) {
	const session = await requireSession();
	const meta = uploadFileMetaSchema.parse({
		fileName: file.name,
		mimeType: file.type,
		sizeBytes: file.size,
	});
	const fileId = createEntityId("file");
	const storageKey = buildStorageKey(session.user.id, fileId, meta.fileName);
	const storage = getFileStorage();

	await storage.put(storageKey, file, meta.mimeType);

	let record: FileRecord;
	try {
		const repository = new DrizzleFileRepository(getDb());
		record = await repository.create(
			insertFileSchema.parse({
				id: fileId,
				ownerId: session.user.id,
				fileName: meta.fileName,
				mimeType: meta.mimeType,
				sizeBytes: meta.sizeBytes,
				storageKey,
			}),
		);
	} catch (error) {
		await storage.delete(storageKey).catch(() => undefined);
		throw error;
	}

	revalidatePath("/files");

	return record;
}

export async function deleteFilesAction(ids: string[]) {
	const parsed = deleteFilesSchema.parse({ ids });
	const session = await requireSession();

	const repository = new DrizzleFileRepository(getDb());
	const deleted = await repository.softDelete(parsed.ids, session.user.id);

	revalidatePath("/files");

	return { deleted };
}

export async function renameFileAction(id: string, fileName: string) {
	const parsed = updateFileSchema.parse({ fileName });
	const session = await requireSession();

	const repository = new DrizzleFileRepository(getDb());
	const record = await repository.rename(id, session.user.id, parsed.fileName);

	if (!record) {
		throw new Error("File not found");
	}
	revalidatePath("/files");

	return record;
}
