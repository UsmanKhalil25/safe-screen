"use client";

import { createColumnHelper } from "@tanstack/react-table";
import {
	ArrowUpDown,
	Download,
	MoreHorizontal,
	Pencil,
	Trash2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { FileRecord } from "../data";
import type { DataTableFeatures } from "../data-table-features";
import { formatDate, formatFileSize } from "../format";
import { FileTypeIcon } from "./file-type-icon";

const columnHelper = createColumnHelper<DataTableFeatures, FileRecord>();

const statusVariant: Record<FileRecord["status"], "secondary" | "outline"> = {
	active: "secondary",
	deleted: "outline",
};

export const statusOptions: { value: FileRecord["status"]; label: string }[] = [
	{ value: "active", label: "Active" },
	{ value: "deleted", label: "Deleted" },
];

export const columns = columnHelper.columns([
	columnHelper.display({
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={table.getIsAllPageRowsSelected()}
				indeterminate={
					table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	}),
	columnHelper.accessor("fileName", {
		header: ({ column }) => (
			<Button
				variant="ghost"
				className="-ml-3"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>
				Name
				<ArrowUpDown className="ml-2 size-4" />
			</Button>
		),
		cell: ({ row }) => (
			<div className="flex items-center gap-2">
				<FileTypeIcon mimeType={row.original.mimeType} />
				<span className="font-medium">{row.getValue("fileName")}</span>
			</div>
		),
	}),
	columnHelper.accessor("status", {
		filterFn: "arrHas",
		header: ({ column }) => (
			<Button
				variant="ghost"
				className="-ml-3"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>
				Status
				<ArrowUpDown className="ml-2 size-4" />
			</Button>
		),
		cell: ({ row }) => {
			const status = row.getValue<FileRecord["status"]>("status");
			return (
				<Badge variant={statusVariant[status]} className="capitalize">
					{status}
				</Badge>
			);
		},
	}),
	columnHelper.accessor("sizeBytes", {
		header: () => <div className="text-right">Size</div>,
		cell: ({ row }) => (
			<div className="text-right text-muted-foreground">
				{formatFileSize(row.getValue("sizeBytes"))}
			</div>
		),
	}),
	columnHelper.accessor("createdAt", {
		header: ({ column }) => (
			<Button
				variant="ghost"
				className="-ml-3"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>
				Uploaded
				<ArrowUpDown className="ml-2 size-4" />
			</Button>
		),
		cell: ({ row }) => (
			<div className="text-muted-foreground">
				{formatDate(row.getValue<Date>("createdAt"))}
			</div>
		),
	}),
	columnHelper.display({
		id: "actions",
		enableHiding: false,
		cell: () => (
			<DropdownMenu>
				<DropdownMenuTrigger render={<Button variant="ghost" size="icon" />}>
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
		),
	}),
]);
