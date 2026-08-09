import {
	Pagination,
	PaginationContent,
	PaginationItem,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";

const PAGE_ITEM_COUNT = 3;

function PaginationSkeleton() {
	return (
		<Pagination aria-hidden className="mx-0 w-auto justify-end">
			<PaginationContent>
				<PaginationItem>
					<Skeleton className="h-8 w-8 rounded-lg sm:w-24" />
				</PaginationItem>
				{Array.from({ length: PAGE_ITEM_COUNT }).map((_, index) => (
					<PaginationItem key={index}>
						<Skeleton className="size-8 rounded-lg" />
					</PaginationItem>
				))}
				<PaginationItem>
					<Skeleton className="h-8 w-8 rounded-lg sm:w-16" />
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
}

export { PaginationSkeleton };
