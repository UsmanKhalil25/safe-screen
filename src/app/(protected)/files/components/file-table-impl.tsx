import { getCloudflareContext } from "@opennextjs/cloudflare";
import {
	Download,
	Inbox,
	MoreHorizontal,
	Pencil,
	SearchX,
	Trash2,
} from "lucide-react";
import { headers } from "next/headers";
import { cache } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Empty,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/components/ui/empty";
import {
	Pagination,
	PaginationContent,
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
import { DEFAULT_PAGE_SIZE, type FileRecord } from "@/lib/contracts/files";
import { formatDate, formatFileSize } from "@/lib/utils";

import { FileTypeIcon } from "./file-type-icon";
import { PageSizeSelect } from "./page-size-select";

export type FilesQuery = {
	page?: string;
	pageSize?: string;
	status?: string;
	search?: string;
	sortBy?: string;
	sortDir?: string;
};

const statusVariant: Record<FileRecord["status"], "secondary" | "outline"> = {
	active: "secondary",
	deleted: "outline",
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

export const getFiles = cache(async (query: FilesQuery) => {
	const { env } = await getCloudflareContext({ async: true });
	const incomingHeaders = await headers();

	const url = new URL("/api/files", env.APP_URL);
	if (query.page) url.searchParams.set("page", query.page);
	if (query.pageSize) url.searchParams.set("pageSize", query.pageSize);
	if (query.status) url.searchParams.set("status", query.status);
	if (query.search) url.searchParams.set("search", query.search);
	if (query.sortBy) url.searchParams.set("sortBy", query.sortBy);
	if (query.sortDir) url.searchParams.set("sortDir", query.sortDir);

	const response = await fetch(url, {
		headers: { cookie: incomingHeaders.get("cookie") ?? "" },
	});

	if (!response.ok) {
		throw new Error(`Failed to load files (${response.status})`);
	}

	const result = await response.json<{
		files: (Omit<FileRecord, "createdAt"> & { createdAt: string })[];
		total: number;
	}>();

	return {
		files: result.files.map((file) => ({
			...file,
			createdAt: new Date(file.createdAt),
		})),
		total: result.total,
	};
});

export async function FileTableImpl({ query }: { query: FilesQuery }) {
	const { files, total } = await getFiles(query);
	const page = Number(query.page ?? 0);
	const pageSize = Number(query.pageSize) || DEFAULT_PAGE_SIZE;
	const pageCount = Math.max(1, Math.ceil(total / pageSize));

	if (files.length === 0) {
		const hasFilters = Boolean(query.search) || Boolean(query.status);

		return (
			<TableBody>
				<TableRow>
					<TableCell colSpan={5} className="h-64 p-0">
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
					</TableCell>
				</TableRow>
			</TableBody>
		);
	}

	return (
		<>
			<TableBody>
				{files.map((file) => (
					<TableRow key={file.id}>
						<TableCell>
							<div className="flex min-w-0 items-center gap-2">
								<FileTypeIcon mimeType={file.mimeType} />
								<span className="truncate font-medium">{file.fileName}</span>
							</div>
						</TableCell>
						<TableCell>
							<Badge
								variant={statusVariant[file.status]}
								className="capitalize"
							>
								{file.status}
							</Badge>
						</TableCell>
						<TableCell className="text-muted-foreground">
							{formatFileSize(file.sizeBytes)}
						</TableCell>
						<TableCell className="text-muted-foreground">
							{formatDate(file.createdAt)}
						</TableCell>
						<TableCell>
							<DropdownMenu>
								<DropdownMenuTrigger
									render={<Button variant="ghost" size="icon" />}
								>
									<span className="sr-only">Open menu</span>
									<MoreHorizontal className="size-4" />
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end">
									<DropdownMenuItem>
										<Download />
										Download
									</DropdownMenuItem>
									<DropdownMenuItem>
										<Pencil />
										Rename
									</DropdownMenuItem>
									<DropdownMenuSeparator />
									<DropdownMenuItem variant="destructive">
										<Trash2 />
										Delete
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
			<TableFooter>
				<TableRow className="hover:bg-transparent">
					<TableCell colSpan={5} className="py-3">
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
										{Array.from({ length: pageCount }, (_, index) => (
											<PaginationItem key={index}>
												<PaginationLink
													href={buildPageHref(query, index)}
													isActive={index === page}
												>
													{index + 1}
												</PaginationLink>
											</PaginationItem>
										))}
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
