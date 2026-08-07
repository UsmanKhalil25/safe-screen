import { defineConfig } from "drizzle-kit";

export default defineConfig({
	casing: "snake_case",
	dialect: "sqlite",
	schema: "./src/db/schema/*",
	out: "./src/db/migrations",
});
