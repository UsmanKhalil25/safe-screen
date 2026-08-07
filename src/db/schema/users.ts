import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { accounts } from "./accounts";
import { persisted } from "./persisted";
import { sessions } from "./sessions";

export const users = sqliteTable("users", {
	...persisted("user"),
	name: text().notNull(),
	email: text().notNull().unique(),
	emailVerified: integer({ mode: "boolean" }).default(false).notNull(),
	image: text(),
});

export const usersRelations = relations(users, ({ many }) => ({
	sessions: many(sessions),
	accounts: many(accounts),
}));
