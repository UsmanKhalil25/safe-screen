"use client";

import { Download, Trash2, X } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/toast";

import { deleteFilesAction } from "../actions";
import { DeleteConfirmDialog } from "./delete-confirm-dialog";

type SelectionContextValue = {
	selectedIds: string[];
	pageIds: string[];
	isSelected: (id: string) => boolean;
	toggle: (id: string) => void;
	toggleAll: () => void;
	clear: () => void;
	setPageIds: (ids: string[]) => void;
};

const SelectionContext = React.createContext<SelectionContextValue | null>(
	null,
);

export function useSelection() {
	const context = React.useContext(SelectionContext);
	if (!context) {
		throw new Error("useSelection must be used within a SelectionProvider");
	}
	return context;
}

export function SelectionProvider({ children }: { children: React.ReactNode }) {
	const [selected, setSelected] = React.useState<Set<string>>(new Set());
	const [pageIds, setPageIdsState] = React.useState<string[]>([]);

	const value = React.useMemo<SelectionContextValue>(
		() => ({
			selectedIds: Array.from(selected),
			pageIds,
			isSelected: (id) => selected.has(id),
			toggle: (id) => {
				setSelected((current) => {
					const next = new Set(current);
					if (next.has(id)) {
						next.delete(id);
					} else {
						next.add(id);
					}
					return next;
				});
			},
			toggleAll: () => {
				setSelected((current) => {
					const allSelected = pageIds.every((id) => current.has(id));
					return allSelected ? new Set() : new Set(pageIds);
				});
			},
			clear: () => setSelected(new Set()),
			// A new page of rows invalidates any prior selection — only ids
			// still visible on the current page are worth keeping selected.
			setPageIds: (ids) => {
				setPageIdsState(ids);
				setSelected((current) => {
					const next = new Set(ids.filter((id) => current.has(id)));
					return next.size === current.size ? current : next;
				});
			},
		}),
		[selected, pageIds],
	);

	return (
		<SelectionContext.Provider value={value}>
			{children}
		</SelectionContext.Provider>
	);
}

export function PageIdsRegistrar({ ids }: { ids: string[] }) {
	const { setPageIds } = useSelection();
	const key = ids.join(",");

	React.useEffect(() => {
		setPageIds(key ? key.split(",") : []);
		// setPageIds is stable for the lifetime of the provider; re-running
		// this effect should only be driven by the page's ids changing.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [key]);

	return null;
}

export function SelectAllCheckbox() {
	const { pageIds, selectedIds, toggleAll } = useSelection();
	const selected = new Set(selectedIds);
	const allSelected =
		pageIds.length > 0 && pageIds.every((id) => selected.has(id));
	const someSelected = !allSelected && pageIds.some((id) => selected.has(id));

	return (
		<Checkbox
			checked={allSelected}
			indeterminate={someSelected}
			onCheckedChange={() => toggleAll()}
			disabled={pageIds.length === 0}
			aria-label="Select all files on this page"
		/>
	);
}

export function RowCheckbox({ fileId }: { fileId: string }) {
	const { isSelected, toggle } = useSelection();

	return (
		<Checkbox
			checked={isSelected(fileId)}
			onCheckedChange={() => toggle(fileId)}
			aria-label="Select file"
		/>
	);
}

export function SelectionActionsBar() {
	const { selectedIds, clear } = useSelection();
	const [confirmOpen, setConfirmOpen] = React.useState(false);
	const [isDeleting, setIsDeleting] = React.useState(false);
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

	async function handleDeleteConfirm() {
		setIsDeleting(true);
		try {
			await deleteFilesAction(selectedIds);
			toast.add({
				title: `${count} file${count === 1 ? "" : "s"} deleted`,
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
