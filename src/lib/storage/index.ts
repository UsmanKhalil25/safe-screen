import { getCloudflareContext } from "@opennextjs/cloudflare";

import { R2BucketStorage } from "./file-storage";

export { buildStorageKey } from "./storage-key";

export function getFileStorage() {
	const { env } = getCloudflareContext();

	return new R2BucketStorage(env.safe_screen_files, {
		accountId: env.R2_FILES_ACCOUNT_ID,
		accessKeyId: env.R2_FILES_ACCESS_KEY_ID,
		secretAccessKey: env.R2_FILES_SECRET_ACCESS_KEY,
	});
}
