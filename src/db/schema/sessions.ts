import { relations } from "drizzle-orm";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { persisted } from "./persisted";
import { users } from "./users";

export const sessions = sqliteTable(
	"sessions",
	{
		...persisted("session"),
		expiresAt: integer({ mode: "timestamp_ms" }).notNull(),
		token: text().notNull().unique(),
		ipAddress: text(),
		userAgent: text(),
		userId: text()
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
	},
	(table) => [index("sessions_user_id_idx").on(table.userId)],
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
	user: one(users, {
		fields: [sessions.userId],
		references: [users.id],
	}),
}));
