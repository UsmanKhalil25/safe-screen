import { v4 as uuidv4 } from "uuid";

export const ENTITY_ID_PREFIXES = {
	account: "acc",
	file: "file",
	session: "ses",
	user: "usr",
	verification: "ver",
} as const;

export type EntityModel = keyof typeof ENTITY_ID_PREFIXES;

export function createEntityId(model: string): string {
	const prefix = ENTITY_ID_PREFIXES[model as EntityModel] ?? "id";

	return `${prefix}_${uuidv4()}`;
}
