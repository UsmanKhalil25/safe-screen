import { ArrowUpDown } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { FileTableImpl, type FilesQuery } from "./file-table-impl";
import { FileTableSkeleton } from "./file-table-skeleton";

const SORTABLE_COLUMNS: {
	id: NonNullable<FilesQuery["sortBy"]>;
	label: string;
}[] = [
	{ id: "fileName", label: "Name" },
	{ id: "status", label: "Status" },
	{ id: "sizeBytes", label: "Size" },
	{ id: "createdAt", label: "Uploaded" },
];

// table-fixed reads these from the header row and locks every column to
// them, so neither the skeleton nor real data ever shifts the layout again.
// max-width doesn't clamp a column under table-layout:fixed (only width
// does), so fileName gets a real width too, same as the others, rather than
// being left unspecified — otherwise it silently absorbs 100% of whatever
// space the fixed columns don't use. Long filenames truncate instead.
const COLUMN_WIDTHS: Partial<
	Record<NonNullable<FilesQuery["sortBy"]>, string>
> = {
	fileName: "w-80",
	status: "w-28",
	sizeBytes: "w-24",
	createdAt: "w-28",
};

function buildSortHref(query: FilesQuery, columnId: string) {
	const params = new URLSearchParams();
	if (query.search) params.set("search", query.search);
	if (query.status) params.set("status", query.status);
	if (query.pageSize) params.set("pageSize", query.pageSize);

	const nextDir =
		query.sortBy === columnId && query.sortDir === "asc" ? "desc" : "asc";
	params.set("sortBy", columnId);
	params.set("sortDir", nextDir);

	return `?${params.toString()}`;
}

export function FileTable({ query }: { query: FilesQuery }) {
	return (
		<div className="overflow-hidden rounded-md border">
			<Table className="table-fixed">
				<TableHeader>
					<TableRow>
						{SORTABLE_COLUMNS.map((column) => (
							<TableHead key={column.id} className={COLUMN_WIDTHS[column.id]}>
								<Link
									href={buildSortHref(query, column.id)}
									className="inline-flex items-center rounded-lg py-1.5 text-sm font-medium hover:bg-muted"
								>
									{column.label}
									<ArrowUpDown className="ml-2 size-4" />
								</Link>
							</TableHead>
						))}
						<TableHead className="w-16" />
					</TableRow>
				</TableHeader>
				<Suspense key={JSON.stringify(query)} fallback={<FileTableSkeleton />}>
					<FileTableImpl query={query} />
				</Suspense>
			</Table>
		</div>
	);
}
