import { relations } from "drizzle-orm";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { persisted } from "./persisted";
import { users } from "./users";

export const accounts = sqliteTable(
	"accounts",
	{
		...persisted("account"),
		accountId: text().notNull(),
		providerId: text().notNull(),
		userId: text()
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		accessToken: text(),
		refreshToken: text(),
		idToken: text(),
		accessTokenExpiresAt: integer({ mode: "timestamp_ms" }),
		refreshTokenExpiresAt: integer({ mode: "timestamp_ms" }),
		scope: text(),
		password: text(),
	},
	(table) => [index("accounts_user_id_idx").on(table.userId)],
);

export const accountsRelations = relations(accounts, ({ one }) => ({
	user: one(users, {
		fields: [accounts.userId],
		references: [users.id],
	}),
}));
