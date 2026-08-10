import { SORT_COLUMNS } from "@/lib/contracts/files";

export const FILES_PAGE_TITLE = "Files";
export const FILES_PAGE_DESCRIPTION =
	"Documents uploaded for candidate screening.";

export const FILE_STATUS_FILTER_OPTIONS = ["all", "active", "deleted"] as const;

const FILE_TABLE_COLUMN_WIDTHS: Record<
	(typeof SORT_COLUMNS)[number]["value"],
	string
> = {
	fileName: "w-80",
	status: "w-28",
	sizeBytes: "w-24",
	createdAt: "w-28",
};

export const FILE_TABLE_COLUMNS = SORT_COLUMNS.map((column) => ({
	...column,
	className: FILE_TABLE_COLUMN_WIDTHS[column.value],
}));

export const MAX_FILE_SIZE_MB = 25;
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
