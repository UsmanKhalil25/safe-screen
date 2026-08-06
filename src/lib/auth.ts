import { getCloudflareContext } from "@opennextjs/cloudflare";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { drizzle } from "drizzle-orm/d1";

import { getDb } from "@/db";
import * as schema from "@/db/schema";
import { createBetterAuthId } from "@/lib/entity-ids";

type AuthDatabase = ReturnType<typeof getDb>;

const drizzleAdapterOptions = {
	camelCase: true,
	provider: "sqlite" as const,
	schema,
	usePlural: true,
};

function createAuth(db: AuthDatabase, secret?: string, baseURL?: string) {
	return betterAuth({
		advanced: {
			database: {
				generateId: createBetterAuthId,
			},
		},
		baseURL,
		database: drizzleAdapter(db, drizzleAdapterOptions),
		emailAndPassword: {
			enabled: true,
		},
		secret,
	});
}

// Runtime: the D1 binding is available after OpenNext initializes the
// Cloudflare context. Async mode is required so this can be called from
// routes/layouts that Next.js may attempt to statically prerender.
export async function getAuth() {
	const { env } = await getCloudflareContext({ async: true });

	return createAuth(getDb(), env.BETTER_AUTH_SECRET, env.BETTER_AUTH_URL);
}

// CLI: Better Auth imports this module in plain Node to inspect auth.options.
const cliDb = drizzle({} as D1Database, {
	casing: "snake_case",
	schema,
}) as AuthDatabase;

export const auth = createAuth(
	cliDb,
	process.env.BETTER_AUTH_SECRET ?? "schema-generation-only",
	process.env.BETTER_AUTH_URL ?? "http://localhost:3000",
);
