import { Suspense } from "react";

import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SORT_COLUMNS } from "@/lib/contracts/files";

import { SelectAllCheckbox } from "../selection/selection-provider";
import { FileTableImpl, type FilesQuery } from "./file-table-impl";
import { FileTableSkeleton } from "./file-table-skeleton";

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
						<TableHead className="w-10">
							<SelectAllCheckbox />
						</TableHead>
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
