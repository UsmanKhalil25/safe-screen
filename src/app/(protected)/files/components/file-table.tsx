import { Suspense } from "react";

import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SORT_COLUMNS } from "@/lib/contracts/files";

import { FileTableImpl, type FilesQuery } from "./file-table-impl";
import { FileTableSkeleton } from "./file-table-skeleton";

// table-fixed reads these from the header row and locks every column to
// them, so neither the skeleton nor real data ever shifts the layout again.
// max-width doesn't clamp a column under table-layout:fixed (only width
// does), so fileName gets a real width too, same as the others, rather than
// being left unspecified — otherwise it silently absorbs 100% of whatever
// space the fixed columns don't use. Long filenames truncate instead.
const COLUMN_WIDTHS: Record<(typeof SORT_COLUMNS)[number]["value"], string> = {
	fileName: "w-80",
	status: "w-28",
	sizeBytes: "w-24",
	createdAt: "w-28",
};

export function FileTable({ query }: { query: FilesQuery }) {
	return (
		<div className="overflow-hidden rounded-md border">
			<Table className="table-fixed">
				<TableHeader>
					<TableRow>
						{SORT_COLUMNS.map((column) => (
							<TableHead
								key={column.value}
								className={COLUMN_WIDTHS[column.value]}
							>
								{column.label}
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
