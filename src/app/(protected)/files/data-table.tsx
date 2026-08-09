"use client";

import {
	useTable,
	type ColumnDef,
	type ColumnFiltersState,
	type ColumnVisibilityState,
	type PaginationState,
	type RowData,
	type SortingState,
} from "@tanstack/react-table";
import { ChevronDown, Download, Trash2 } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import { statusOptions } from "./columns";
import { features, type DataTableFeatures } from "./data-table-features";

interface DataTableProps<TData extends RowData> {
	columns: ColumnDef<DataTableFeatures, TData>[];
	data: TData[];
}

export function DataTable<TData extends RowData>({
	columns,
	data,
}: DataTableProps<TData>) {
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[],
	);
	const [columnVisibility, setColumnVisibility] =
		React.useState<ColumnVisibilityState>({});
	const [rowSelection, setRowSelection] = React.useState({});
	const [pagination, setPagination] = React.useState<PaginationState>({
		pageIndex: 0,
		pageSize: 10,
	});

	const table = useTable({
		features,
		data,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		onPaginationChange: setPagination,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
			pagination,
		},
	});

	const selectedCount = table.getFilteredSelectedRowModel().rows.length;

	return (
		<div className="w-full">
			<div className="flex items-center gap-2 py-4">
				<Input
					placeholder="Filter files..."
					value={
						(table.getColumn("fileName")?.getFilterValue() as string) ?? ""
					}
					onChange={(event) =>
						table.getColumn("fileName")?.setFilterValue(event.target.value)
					}
					className="max-w-sm"
				/>
				<DropdownMenu>
					<DropdownMenuTrigger render={<Button variant="outline" />}>
						Status <ChevronDown className="ml-2 size-4" />
					</DropdownMenuTrigger>
					<DropdownMenuContent align="start" className="w-40">
						{statusOptions.map((option) => {
							const current =
								(table.getColumn("status")?.getFilterValue() as
									string[] | undefined) ?? [];
							const checked = current.includes(option.value);
							return (
								<DropdownMenuCheckboxItem
									key={option.value}
									checked={checked}
									onCheckedChange={(value) => {
										const next = value
											? [...current, option.value]
											: current.filter((v) => v !== option.value);
										table.getColumn("status")?.setFilterValue(next);
									}}
								>
									{option.label}
								</DropdownMenuCheckboxItem>
							);
						})}
					</DropdownMenuContent>
				</DropdownMenu>
				<DropdownMenu>
					<DropdownMenuTrigger
						render={<Button variant="outline" className="ml-auto" />}
					>
						Columns <ChevronDown className="ml-2 size-4" />
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" className="w-44">
						{table
							.getAllColumns()
							.filter((column) => column.getCanHide())
							.map((column) => (
								<DropdownMenuCheckboxItem
									key={column.id}
									className="capitalize"
									checked={column.getIsVisible()}
									onCheckedChange={(value) => column.toggleVisibility(!!value)}
								>
									{column.id}
								</DropdownMenuCheckboxItem>
							))}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>

			{selectedCount > 0 && (
				<div className="mb-2 flex items-center justify-between rounded-lg border bg-muted/50 px-3 py-2">
					<span className="text-sm font-medium">
						{selectedCount} of {table.getFilteredRowModel().rows.length} row(s)
						selected.
					</span>
					<div className="flex items-center gap-2">
						<Button variant="outline" size="sm">
							<Download />
							Download
						</Button>
						<Button variant="outline" size="sm" className="text-destructive">
							<Trash2 />
							Delete
						</Button>
					</div>
				</div>
			)}

			<div className="overflow-hidden rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<TableHead key={header.id}>
										{header.isPlaceholder ? null : (
											<table.FlexRender header={header} />
										)}
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											<table.FlexRender cell={cell} />
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			<div className="flex items-center justify-end py-4">
				<Pagination className="mx-0 w-auto">
					<PaginationContent>
						<PaginationItem>
							<PaginationPrevious
								href="#"
								aria-disabled={!table.getCanPreviousPage()}
								className={
									!table.getCanPreviousPage()
										? "pointer-events-none opacity-50"
										: undefined
								}
								onClick={(event) => {
									event.preventDefault();
									table.previousPage();
								}}
							/>
						</PaginationItem>
						{table.getPageOptions().map((index) => (
							<PaginationItem key={index}>
								<PaginationLink
									href="#"
									isActive={index === pagination.pageIndex}
									onClick={(event) => {
										event.preventDefault();
										table.setPageIndex(index);
									}}
								>
									{index + 1}
								</PaginationLink>
							</PaginationItem>
						))}
						<PaginationItem>
							<PaginationNext
								href="#"
								aria-disabled={!table.getCanNextPage()}
								className={
									!table.getCanNextPage()
										? "pointer-events-none opacity-50"
										: undefined
								}
								onClick={(event) => {
									event.preventDefault();
									table.nextPage();
								}}
							/>
						</PaginationItem>
					</PaginationContent>
				</Pagination>
			</div>
		</div>
	);
}
