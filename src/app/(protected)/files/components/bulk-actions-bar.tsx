"use client";

import { Download, Trash2, X } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/toast";

import { useSelection } from "./selection";

export function BulkActionsBar() {
	const { selectedIds, clear } = useSelection();
	const [confirmOpen, setConfirmOpen] = React.useState(false);
	const count = selectedIds.length;

	if (count === 0) {
		return null;
	}

	function handleDownload() {
		toast.add({
			title: `Downloading ${count} file${count === 1 ? "" : "s"}…`,
			type: "info",
		});
	}

	function handleDeleteConfirm() {
		toast.add({
			title: `${count} file${count === 1 ? "" : "s"} deleted`,
			type: "success",
		});
		clear();
		setConfirmOpen(false);
	}

	return (
		<div className="mb-4 flex items-center gap-2 rounded-md border bg-muted/50 px-3 py-2">
			<span className="text-sm font-medium">{count} selected</span>
			<div className="ml-auto flex items-center gap-2">
				<Button variant="outline" size="sm" onClick={handleDownload}>
					<Download />
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

			<Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>
							Delete {count} file{count === 1 ? "" : "s"}?
						</DialogTitle>
						<DialogDescription>
							This will remove the selected file
							{count === 1 ? "" : "s"} from your files.
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<Button variant="outline" onClick={() => setConfirmOpen(false)}>
							Cancel
						</Button>
						<Button variant="destructive" onClick={handleDeleteConfirm}>
							Delete
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
