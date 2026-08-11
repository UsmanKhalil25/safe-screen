"use client";

import { Download, Trash2, X } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import { pluralize, triggerDownload } from "@/lib/utils";

import { deleteFilesAction, downloadFilesAction } from "../../actions";
import { DeleteConfirmDialog } from "../delete-confirm-dialog";
import { useSelection } from "./selection-provider";

export function SelectionActionsBar() {
	const { selectedIds, clear } = useSelection();
	const [confirmOpen, setConfirmOpen] = React.useState(false);
	const [isDeleting, setIsDeleting] = React.useState(false);
	const [isDownloading, setIsDownloading] = React.useState(false);
	const count = selectedIds.length;

	if (count === 0) {
		return null;
	}

	async function runDownload(): Promise<number> {
		const { results, notFound } = await downloadFilesAction(selectedIds);

		for (const [index, { url }] of results.entries()) {
			if (index > 0) {
				await new Promise((resolve) => setTimeout(resolve, 400));
			}
			triggerDownload(url);
		}

		return notFound.length;
	}

	async function handleDownload() {
		setIsDownloading(true);
		try {
			await toast.promise(runDownload(), {
				loading: {
					title: `Downloading ${count} ${pluralize(count, "file")}…`,
					description:
						count > 1
							? "If your browser blocks some downloads, allow multiple downloads when prompted."
							: undefined,
				},
				success: (notFoundCount) =>
					notFoundCount > 0
						? {
								title: `${notFoundCount} ${pluralize(notFoundCount, "file")} no longer available`,
								type: "warning",
							}
						: `${count} ${pluralize(count, "file")} downloaded`,
				error: `Failed to download ${pluralize(count, "file")}`,
			});
		} finally {
			setIsDownloading(false);
		}
	}

	async function handleDeleteConfirm() {
		setIsDeleting(true);
		try {
			await deleteFilesAction(selectedIds);
			toast.add({
				title: `${count} ${pluralize(count, "file")} deleted`,
				type: "success",
			});
			clear();
			setConfirmOpen(false);
		} catch {
			toast.add({ title: "Failed to delete files", type: "error" });
		} finally {
			setIsDeleting(false);
		}
	}

	return (
		<div className="mb-4 flex items-center gap-2 rounded-md border bg-muted/50 px-3 py-2">
			<span className="text-sm font-medium">{count} selected</span>
			<div className="ml-auto flex items-center gap-2">
				<Button
					variant="outline"
					size="sm"
					onClick={handleDownload}
					disabled={isDownloading}
				>
					{isDownloading ? <Spinner /> : <Download />}
					Download
				</Button>
				<Button
					variant="destructive"
					size="sm"
					onClick={() => setConfirmOpen(true)}
				>
					<Trash2 />
					Delete
				</Button>
				<Button
					variant="ghost"
					size="icon-sm"
					aria-label="Clear selection"
					onClick={clear}
				>
					<X />
				</Button>
			</div>

			<DeleteConfirmDialog
				open={confirmOpen}
				onOpenChange={setConfirmOpen}
				count={count}
				onConfirm={handleDeleteConfirm}
				isDeleting={isDeleting}
			/>
		</div>
	);
}
