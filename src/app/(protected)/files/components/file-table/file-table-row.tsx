"use client";

import { Download, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import * as React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MimeIcon } from "@/components/ui/mime-icon";
import { TableCell, TableRow } from "@/components/ui/table";
import { toast } from "@/components/ui/toast";
import type { FileRecord } from "@/lib/contracts/files";
import { formatDate, formatFileSize } from "@/lib/utils";

import { deleteFilesAction, renameFileAction } from "../../actions";
import { DeleteConfirmDialog } from "../delete-confirm-dialog";
import { RenameDialog } from "../rename-dialog";
import { RowCheckbox } from "../selection/selection-provider";

const statusVariant: Record<FileRecord["status"], "secondary" | "outline"> = {
	active: "secondary",
	deleted: "outline",
};

export function FileTableRow({ file }: { file: FileRecord }) {
	const [renameOpen, setRenameOpen] = React.useState(false);
	const [isRenaming, setIsRenaming] = React.useState(false);
	const [deleteOpen, setDeleteOpen] = React.useState(false);
	const [isDeleting, setIsDeleting] = React.useState(false);

	function handleDownload() {
		toast.add({ title: `Downloading ${file.fileName}…`, type: "info" });
	}

	async function handleRenameConfirm(nextFileName: string) {
		setIsRenaming(true);
		try {
			await renameFileAction(file.id, nextFileName);
			toast.add({ title: "File renamed", type: "success" });
			setRenameOpen(false);
		} catch {
			toast.add({ title: "Failed to rename file", type: "error" });
		} finally {
			setIsRenaming(false);
		}
	}

	async function handleDeleteConfirm() {
		setIsDeleting(true);
		try {
			await deleteFilesAction([file.id]);
			toast.add({ title: "File deleted", type: "success" });
			setDeleteOpen(false);
		} catch {
			toast.add({ title: "Failed to delete file", type: "error" });
		} finally {
			setIsDeleting(false);
		}
	}

	return (
		<TableRow>
			<TableCell>
				<RowCheckbox fileId={file.id} />
			</TableCell>
			<TableCell>
				<div className="flex min-w-0 items-center gap-2">
					<MimeIcon mimeType={file.mimeType} />
					<span className="truncate font-medium">{file.fileName}</span>
				</div>
			</TableCell>
			<TableCell>
				<Badge variant={statusVariant[file.status]} className="capitalize">
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
					<DropdownMenuTrigger render={<Button variant="ghost" size="icon" />}>
						<span className="sr-only">Open menu</span>
						<MoreHorizontal className="size-4" />
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem onClick={handleDownload}>
							<Download />
							Download
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => setRenameOpen(true)}>
							<Pencil />
							Rename
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							variant="destructive"
							onClick={() => setDeleteOpen(true)}
						>
							<Trash2 />
							Delete
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>

				<RenameDialog
					open={renameOpen}
					onOpenChange={setRenameOpen}
					fileName={file.fileName}
					onConfirm={handleRenameConfirm}
					isRenaming={isRenaming}
				/>
				<DeleteConfirmDialog
					open={deleteOpen}
					onOpenChange={setDeleteOpen}
					count={1}
					onConfirm={handleDeleteConfirm}
					isDeleting={isDeleting}
				/>
			</TableCell>
		</TableRow>
	);
}
