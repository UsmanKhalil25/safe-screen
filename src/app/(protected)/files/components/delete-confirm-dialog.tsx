"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";

export function DeleteConfirmDialog({
	open,
	onOpenChange,
	count,
	onConfirm,
	isDeleting,
}: {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	count: number;
	onConfirm: () => void;
	isDeleting: boolean;
}) {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						Delete {count} file{count === 1 ? "" : "s"}?
					</DialogTitle>
					<DialogDescription>
						This will remove the selected file{count === 1 ? "" : "s"} from
						your files.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button
						variant="outline"
						onClick={() => onOpenChange(false)}
						disabled={isDeleting}
					>
						Cancel
					</Button>
					<Button
						variant="destructive"
						onClick={onConfirm}
						disabled={isDeleting}
					>
						{isDeleting && <Spinner />}
						Delete
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
