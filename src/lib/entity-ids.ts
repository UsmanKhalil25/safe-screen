import { v4 as uuidv4 } from "uuid";

export const ENTITY_ID_PREFIXES = {
	account: "acc",
	session: "ses",
	user: "usr",
	verification: "ver",
} as const;

export type BetterAuthModel = keyof typeof ENTITY_ID_PREFIXES;

export function createBetterAuthId({ model }: { model: string }) {
	const prefix = ENTITY_ID_PREFIXES[model as BetterAuthModel] ?? "id";

	return `${prefix}_${uuidv4()}`;
}
