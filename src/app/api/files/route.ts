import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextResponse, type NextRequest } from "next/server";

import { getDb } from "@/db";
import { DrizzleFileRepository } from "@/db/repository/file-repository";
import { getAuth } from "@/lib/auth";
import { insertFileSchema, listFilesQuerySchema } from "@/lib/contracts/files";
import { R2BucketStorage } from "@/lib/storage/file-storage";

const MAX_FILE_SIZE = 25 * 1024 * 1024;

export async function GET(request: NextRequest) {
	const auth = await getAuth();
	const session = await auth.api.getSession({ headers: request.headers });

	if (!session) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const searchParams = request.nextUrl.searchParams;
	const parsed = listFilesQuerySchema.safeParse({
		page: searchParams.get("page") ?? undefined,
		pageSize: searchParams.get("pageSize") ?? undefined,
		status: searchParams.getAll("status"),
		search: searchParams.get("search") ?? undefined,
		sortBy: searchParams.get("sortBy") ?? undefined,
		sortDir: searchParams.get("sortDir") ?? undefined,
	});

	if (!parsed.success) {
		return NextResponse.json(
			{ error: "Invalid query", issues: parsed.error.issues },
			{ status: 400 },
		);
	}

	const repository = new DrizzleFileRepository(getDb());
	const result = await repository.list({
		ownerId: session.user.id,
		...parsed.data,
	});

	return NextResponse.json(result, { status: 200 });
}

export async function POST(request: NextRequest) {
	const auth = await getAuth();
	const session = await auth.api.getSession({ headers: request.headers });

	if (!session) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const formData = await request.formData();
	const file = formData.get("file");

	if (!(file instanceof File)) {
		return NextResponse.json({ error: "Missing file" }, { status: 400 });
	}

	if (file.size > MAX_FILE_SIZE) {
		return NextResponse.json({ error: "File is too large" }, { status: 413 });
	}

	const storageKey = `${session.user.id}/${crypto.randomUUID()}-${file.name}`;
	const contentType = file.type || "application/octet-stream";

	const parsed = insertFileSchema.safeParse({
		ownerId: session.user.id,
		fileName: file.name,
		mimeType: contentType,
		sizeBytes: file.size,
		storageKey,
	});

	if (!parsed.success) {
		return NextResponse.json(
			{ error: "Invalid file", issues: parsed.error.issues },
			{ status: 400 },
		);
	}

	const { env } = getCloudflareContext();
	const storage = new R2BucketStorage(env.safe_screen_files);
	const repository = new DrizzleFileRepository(getDb());

	await storage.put(storageKey, file, contentType);
	const record = await repository.create(parsed.data);

	return NextResponse.json(record, { status: 201 });
}
