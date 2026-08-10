"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import { getDb } from "@/db";
import { DrizzleFileRepository } from "@/db/repository/file-repository";
import { getAuth } from "@/lib/auth";
import { deleteFilesSchema, updateFileSchema } from "@/lib/contracts/files";

async function requireSession() {
	const auth = await getAuth();
	const session = await auth.api.getSession({ headers: await headers() });

	if (!session) {
		throw new Error("Unauthorized");
	}

	return session;
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
