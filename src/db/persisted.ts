import { sql } from "drizzle-orm";
import { integer, text } from "drizzle-orm/sqlite-core";

import { createEntityId, type EntityModel } from "@/lib/entity-ids";

export function persisted(model: EntityModel) {
	return {
		id: text()
			.primaryKey()
			.$defaultFn(() => createEntityId(model)),
		createdAt: integer({ mode: "timestamp_ms" })
			.default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
			.notNull(),
		updatedAt: integer({ mode: "timestamp_ms" })
			.default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
			.$onUpdate(() => new Date())
			.notNull(),
	};
}
