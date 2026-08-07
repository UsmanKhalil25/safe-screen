import { relations } from "drizzle-orm";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { persisted } from "./persisted";
import { users } from "./users";

export const files = sqliteTable(
	"files",
	{
		...persisted("file"),
		ownerId: text()
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		fileName: text().notNull(),
		mimeType: text().notNull(),
		sizeBytes: integer().notNull(),
		storageKey: text().notNull(),
		status: text({ enum: ["active", "deleted"] })
			.default("active")
			.notNull(),
	},
	(table) => [index("files_owner_id_idx").on(table.ownerId)],
);

export const filesRelations = relations(files, ({ one }) => ({
	owner: one(users, {
		fields: [files.ownerId],
		references: [users.id],
	}),
}));
