import { existsSync, readdirSync } from "node:fs";
import path from "node:path";

import { defineConfig } from "drizzle-kit";

function getLocalD1DB() {
	const basePath = path.resolve(
		".wrangler/state/v3/d1/miniflare-D1DatabaseObject",
	);

	if (!existsSync(basePath)) {
		throw new Error(
			`Local D1 database not found at ${basePath}. Run \`pnpm dev\` at least once to initialize it.`,
		);
	}

	const dbFile = readdirSync(basePath).find(
		(f) => f.endsWith(".sqlite") && f !== "metadata.sqlite",
	);

	if (!dbFile) {
		throw new Error(`No .sqlite file found in ${basePath}.`);
	}

	return path.join(basePath, dbFile);
}

export default defineConfig({
	casing: "snake_case",
	dialect: "sqlite",
	schema: "./src/db/schema/*",
	dbCredentials: {
		url: getLocalD1DB(),
	},
});
