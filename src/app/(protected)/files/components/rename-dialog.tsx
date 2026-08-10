"use client";

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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";

export function RenameDialog({
	open,
	onOpenChange,
	fileName,
	onConfirm,
	isRenaming,
}: {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	fileName: string;
	onConfirm: (fileName: string) => void;
	isRenaming: boolean;
}) {
	const [value, setValue] = React.useState(fileName);
	const [prevOpen, setPrevOpen] = React.useState(open);

	if (open !== prevOpen) {
		setPrevOpen(open);
		if (open) {
			setValue(fileName);
		}
	}

	const trimmed = value.trim();
	const canSubmit = trimmed.length > 0 && trimmed !== fileName;

	function handleSubmit(event: React.FormEvent) {
		event.preventDefault();
		if (!canSubmit) return;
		onConfirm(trimmed);
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<form onSubmit={handleSubmit}>
					<DialogHeader>
						<DialogTitle>Rename file</DialogTitle>
						<DialogDescription>
							Choose a new name for this file.
						</DialogDescription>
					</DialogHeader>
					<div className="py-2">
						<Label htmlFor="rename-file-name" className="sr-only">
							File name
						</Label>
						<Input
							id="rename-file-name"
							value={value}
							onChange={(event) => setValue(event.target.value)}
							autoFocus
							disabled={isRenaming}
						/>
					</div>
					<DialogFooter>
						<Button
							type="button"
							variant="outline"
							onClick={() => onOpenChange(false)}
							disabled={isRenaming}
						>
							Cancel
						</Button>
						<Button type="submit" disabled={!canSubmit || isRenaming}>
							{isRenaming && <Spinner />}
							Save
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
