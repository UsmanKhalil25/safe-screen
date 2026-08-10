import { getCloudflareContext } from "@opennextjs/cloudflare";

import { R2BucketStorage } from "./file-storage";

export { buildStorageKey } from "./storage-key";

export function getFileStorage() {
	const { env } = getCloudflareContext();

	return new R2BucketStorage(env.safe_screen_files);
}
