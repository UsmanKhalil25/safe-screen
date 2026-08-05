import { getCloudflareContext } from "@opennextjs/cloudflare";
import { drizzle } from "drizzle-orm/d1";

export function getDb() {
	const { env } = getCloudflareContext();
	return drizzle(env.safe_screen);
}
