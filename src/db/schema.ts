import { relations } from "drizzle-orm";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { persisted } from "./persisted";

export const users = sqliteTable("users", {
	...persisted("user"),
	name: text().notNull(),
	email: text().notNull().unique(),
	emailVerified: integer({ mode: "boolean" }).default(false).notNull(),
	image: text(),
});

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

export const usersRelations = relations(users, ({ many }) => ({
	sessions: many(sessions),
	accounts: many(accounts),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
	user: one(users, {
		fields: [sessions.userId],
		references: [users.id],
	}),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
	user: one(users, {
		fields: [accounts.userId],
		references: [users.id],
	}),
}));
