import { AlertTriangle, Inbox, SearchX } from "lucide-react";
import { headers } from "next/headers";
import { cache } from "react";

import {
	Empty,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/components/ui/empty";
import {
	ErrorState as ErrorStateBase,
	ErrorStateDescription,
	ErrorStateHeader,
	ErrorStateMedia,
	ErrorStateTitle,
} from "@/components/ui/error-state";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import {
	TableBody,
	TableCell,
	TableFooter,
	TableRow,
} from "@/components/ui/table";
import { getDb } from "@/db";
import { DrizzleFileRepository } from "@/db/repository/file-repository";
import { getAuth } from "@/lib/auth";
import {
	DEFAULT_PAGE_SIZE,
	FileRecord,
	listFilesQuerySchema,
} from "@/lib/contracts/files";

import { PageSizeSelect } from "../page-size-select";
import { PageIdsRegistrar } from "../selection/selection-provider";
import { FileTableRow } from "./file-table-row";

export type FilesQuery = {
	page?: string;
	pageSize?: string;
	status?: string;
	search?: string;
	sortBy?: string;
	sortDir?: string;
};

function buildPageHref(query: FilesQuery, page: number) {
	const params = new URLSearchParams();
	if (query.search) params.set("search", query.search);
	if (query.status) params.set("status", query.status);
	if (query.sortBy) params.set("sortBy", query.sortBy);
	if (query.sortDir) params.set("sortDir", query.sortDir);
	if (query.pageSize) params.set("pageSize", query.pageSize);
	params.set("page", String(page));

	return `?${params.toString()}`;
}

const PAGINATION_ELLIPSIS = "ellipsis" as const;
const PAGINATION_SIBLING_COUNT = 1;

// 0-indexed page numbers, with runs of hidden pages collapsed into an
// ellipsis marker. Always keeps the first/last page and a window of
// siblingCount pages around the current one visible.
function getPaginationRange(page: number, pageCount: number) {
	// One less than the space-optimal cutoff (siblingCount * 2 + 5), so an
	// ellipsis shows even where it only hides a single page number, keeping
	// the control visually compact at 7 pages instead of only from 8 on.
	const totalVisible = PAGINATION_SIBLING_COUNT * 2 + 4;

	if (totalVisible >= pageCount) {
		return Array.from({ length: pageCount }, (_, index) => index);
	}

	const leftSibling = Math.max(page - PAGINATION_SIBLING_COUNT, 0);
	const rightSibling = Math.min(page + PAGINATION_SIBLING_COUNT, pageCount - 1);
	const showLeftEllipsis = leftSibling > 1;
	const showRightEllipsis = rightSibling < pageCount - 2;
	const lastPage = pageCount - 1;

	if (!showLeftEllipsis && showRightEllipsis) {
		const leftRange = Array.from(
			{ length: 3 + PAGINATION_SIBLING_COUNT * 2 },
			(_, index) => index,
		);

		return [...leftRange, PAGINATION_ELLIPSIS, lastPage];
	}

	if (showLeftEllipsis && !showRightEllipsis) {
		const rightItemCount = 3 + PAGINATION_SIBLING_COUNT * 2;
		const rightRange = Array.from(
			{ length: rightItemCount },
			(_, index) => lastPage - rightItemCount + 1 + index,
		);

		return [0, PAGINATION_ELLIPSIS, ...rightRange];
	}

	const middleRange = Array.from(
		{ length: rightSibling - leftSibling + 1 },
		(_, index) => leftSibling + index,
	);

	return [
		0,
		PAGINATION_ELLIPSIS,
		...middleRange,
		PAGINATION_ELLIPSIS,
		lastPage,
	];
}

export const getFiles = cache(async (query: FilesQuery) => {
	const auth = await getAuth();
	const session = await auth.api.getSession({ headers: await headers() });

	if (!session) {
		throw new Error("Unauthorized");
	}

	const parsed = listFilesQuerySchema.parse({
		page: query.page,
		pageSize: query.pageSize,
		status: query.status,
		search: query.search,
		sortBy: query.sortBy,
		sortDir: query.sortDir,
	});

	const repository = new DrizzleFileRepository(getDb());

	return repository.list({ ownerId: session.user.id, ...parsed });
});

function EmptyState({ hasFilters }: { hasFilters: boolean }) {
	return (
		<Empty className="border-none">
			<EmptyHeader>
				<EmptyMedia variant="icon" className="size-12">
					{hasFilters ? (
						<SearchX className="size-6" />
					) : (
						<Inbox className="size-6" />
					)}
				</EmptyMedia>
				<EmptyTitle>
					{hasFilters ? "No matching files" : "No files yet"}
				</EmptyTitle>
				<EmptyDescription>
					{hasFilters
						? "Try adjusting your search or status filter."
						: "Files you upload will show up here."}
				</EmptyDescription>
			</EmptyHeader>
		</Empty>
	);
}

function ErrorState() {
	return (
		<ErrorStateBase className="border-none">
			<ErrorStateHeader>
				<ErrorStateMedia variant="icon" className="size-12">
					<AlertTriangle className="size-6" />
				</ErrorStateMedia>
				<ErrorStateTitle>Failed to load files</ErrorStateTitle>
				<ErrorStateDescription>
					We ran into a problem loading your files. Please try again.
				</ErrorStateDescription>
			</ErrorStateHeader>
		</ErrorStateBase>
	);
}

export async function FileTableImpl({ query }: { query: FilesQuery }) {
	let files: FileRecord[] = [];
	let total = 0;
	let hasError = false;

	try {
		({ files, total } = await getFiles(query));
	} catch {
		hasError = true;
	}

	const page = Number(query.page ?? 0);
	const pageSize = Number(query.pageSize) || DEFAULT_PAGE_SIZE;
	const pageCount = Math.max(1, Math.ceil(total / pageSize));
	const hasFilters = Boolean(query.search) || Boolean(query.status);
	const showError = hasError;
	const showEmpty = !hasError && files.length === 0;

	function renderTable() {
		return (
			<>
				<TableBody>
					<PageIdsRegistrar ids={files.map((file) => file.id)} />
					{files.map((file) => (
						<FileTableRow key={file.id} file={file} />
					))}
				</TableBody>
				<TableFooter>
					<TableRow className="hover:bg-transparent">
						<TableCell colSpan={6} className="py-3">
							<div className="flex items-center justify-between gap-2">
								<PageSizeSelect />
								{pageCount > 1 && (
									<Pagination className="mx-0 w-auto justify-end">
										<PaginationContent>
											<PaginationItem>
												<PaginationPrevious
													href={buildPageHref(query, Math.max(0, page - 1))}
													aria-disabled={page <= 0}
													className={
														page <= 0
															? "pointer-events-none opacity-50"
															: undefined
													}
												/>
											</PaginationItem>
											{getPaginationRange(page, pageCount).map((item, index) =>
												item === PAGINATION_ELLIPSIS ? (
													<PaginationItem key={`ellipsis-${index}`}>
														<PaginationEllipsis />
													</PaginationItem>
												) : (
													<PaginationItem key={item}>
														<PaginationLink
															href={buildPageHref(query, item)}
															isActive={item === page}
														>
															{item + 1}
														</PaginationLink>
													</PaginationItem>
												),
											)}
											<PaginationItem>
												<PaginationNext
													href={buildPageHref(
														query,
														Math.min(pageCount - 1, page + 1),
													)}
													aria-disabled={page >= pageCount - 1}
													className={
														page >= pageCount - 1
															? "pointer-events-none opacity-50"
															: undefined
													}
												/>
											</PaginationItem>
										</PaginationContent>
									</Pagination>
								)}
							</div>
						</TableCell>
					</TableRow>
				</TableFooter>
			</>
		);
	}

	function getComponent() {
		if (showError) return <ErrorState />;
		if (showEmpty) return <EmptyState hasFilters={hasFilters} />;
		return renderTable();
	}

	if (showError || showEmpty) {
		return (
			<TableBody>
				<PageIdsRegistrar ids={[]} />
				<TableRow>
					<TableCell colSpan={6} className="h-64 p-0">
						{getComponent()}
					</TableCell>
				</TableRow>
			</TableBody>
		);
	}

	return getComponent();
}
