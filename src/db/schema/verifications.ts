import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { persisted } from "./persisted";

export const verifications = sqliteTable(
	"verifications",
	{
		...persisted("verification"),
		identifier: text().notNull(),
		value: text().notNull(),
		expiresAt: integer({ mode: "timestamp_ms" }).notNull(),
	},
	(table) => [index("verifications_identifier_idx").on(table.identifier)],
);
