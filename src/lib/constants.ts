export const SORT_DIRECTION_OPTIONS = ["asc", "desc"] as const;

export const SORT_DIRECTION_LABELS: Record<
	(typeof SORT_DIRECTION_OPTIONS)[number],
	string
> = {
	asc: "Ascending",
	desc: "Descending",
};
