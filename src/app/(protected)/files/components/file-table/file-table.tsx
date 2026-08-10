import { Suspense } from "react";

import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { FILE_TABLE_COLUMNS } from "../../constants";
import { SelectAllCheckbox } from "../selection/selection-provider";
import { FileTableImpl, type FilesQuery } from "./file-table-impl";
import { FileTableSkeleton } from "./file-table-skeleton";

export function FileTable({ query }: { query: FilesQuery }) {
	return (
		<div className="overflow-hidden rounded-md border">
			<Table className="table-fixed">
				<TableHeader>
					<TableRow>
						<TableHead className="w-10">
							<SelectAllCheckbox />
						</TableHead>
						{FILE_TABLE_COLUMNS.map((column) => (
							<TableHead key={column.value} className={column.className}>
								{column.label}
							</TableHead>
						))}
						<TableHead className="w-16" />
					</TableRow>
				</TableHeader>
				<Suspense
					key={JSON.stringify(query)}
					fallback={<FileTableSkeleton pageSize={query.pageSize} />}
				>
					<FileTableImpl query={query} />
				</Suspense>
			</Table>
		</div>
	);
}
