import { PaginationSkeleton } from "@/components/ui/pagination-skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import {
	TableBody,
	TableCell,
	TableFooter,
	TableRow,
} from "@/components/ui/table";

const SKELETON_ROW_COUNT = 10;

export function FileTableSkeleton() {
	return (
		<>
			<TableBody>
				{Array.from({ length: SKELETON_ROW_COUNT }).map((_, index) => (
					<TableRow key={index}>
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
					<TableCell colSpan={5} className="py-3">
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
