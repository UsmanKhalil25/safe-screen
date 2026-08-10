import { PaginationSkeleton } from "@/components/ui/pagination-skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import {
	TableBody,
	TableCell,
	TableFooter,
	TableRow,
} from "@/components/ui/table";
import { DEFAULT_PAGE_SIZE } from "@/lib/contracts/files";

export function FileTableSkeleton({ pageSize }: { pageSize?: string }) {
	const rowCount = Number(pageSize) || DEFAULT_PAGE_SIZE;

	return (
		<>
			<TableBody>
				{Array.from({ length: rowCount }).map((_, index) => (
					<TableRow key={index}>
						<TableCell>
							<Skeleton className="size-4 rounded-[4px]" />
						</TableCell>
						<TableCell>
							<Skeleton className="h-4 w-54" />
						</TableCell>
						<TableCell>
							<Skeleton className="h-4 w-12 rounded-4xl" />
						</TableCell>
						<TableCell>
							<Skeleton className="h-4 w-16" />
						</TableCell>
						<TableCell>
							<Skeleton className="h-4 w-20" />
						</TableCell>
						<TableCell>
							<Skeleton className="size-8 rounded-md" />
						</TableCell>
					</TableRow>
				))}
			</TableBody>
			<TableFooter>
				<TableRow className="hover:bg-transparent">
					<TableCell colSpan={6} className="py-3">
						<div className="flex items-center justify-between gap-2">
							<Skeleton className="h-8 w-32 rounded-lg" />
							<PaginationSkeleton />
						</div>
					</TableCell>
				</TableRow>
			</TableFooter>
		</>
	);
}
