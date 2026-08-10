"use client";

import { Upload, X } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { MimeIcon } from "@/components/ui/mime-icon";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import type { FileRecord } from "@/lib/contracts/files";
import { formatFileSize, pluralize } from "@/lib/utils";

const MAX_FILE_SIZE = 25 * 1024 * 1024;

const SIMULATED_BYTES_PER_MS = 20_000;
const MIN_UPLOAD_MS = 500;
const MAX_UPLOAD_MS = 3000;
const TICK_MS = 100;

function estimateUploadDuration(sizeBytes: number) {
	return Math.min(
		MAX_UPLOAD_MS,
		Math.max(MIN_UPLOAD_MS, sizeBytes / SIMULATED_BYTES_PER_MS),
	);
}

type UploadStatus = "uploading" | "done" | "error";

type UploadEntry = {
	id: string;
	file: File;
	progress: number;
	status: UploadStatus;
	startedAt: number;
	durationMs: number;
};

export function UploadDialog() {
	const router = useRouter();
	const [open, setOpen] = React.useState(false);
	const [entries, setEntries] = React.useState<UploadEntry[]>([]);
	const [isDragging, setIsDragging] = React.useState(false);

	const hasUploading = entries.some((entry) => entry.status === "uploading");

	React.useEffect(() => {
		if (!hasUploading) return;

		const interval = setInterval(() => {
			setEntries((current) =>
				current.map((entry) => {
					if (entry.status !== "uploading") return entry;

					const elapsed = Date.now() - entry.startedAt;
					const progress = Math.min(100, (elapsed / entry.durationMs) * 100);

					return {
						...entry,
						progress,
						status: progress >= 100 ? "done" : "uploading",
					};
				}),
			);
		}, TICK_MS);

		return () => clearInterval(interval);
	}, [hasUploading]);

	function addFiles(fileList: File[]) {
		const now = Date.now();
		const nextEntries = fileList.map<UploadEntry>((file) => ({
			id: crypto.randomUUID(),
			file,
			progress: 0,
			status: file.size > MAX_FILE_SIZE ? "error" : "uploading",
			startedAt: now,
			durationMs: estimateUploadDuration(file.size),
		}));

		setEntries((current) => [...current, ...nextEntries]);
	}

	function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
		if (event.currentTarget.files) {
			addFiles(Array.from(event.currentTarget.files));
		}
		event.currentTarget.value = "";
	}

	function handleDrop(event: React.DragEvent<HTMLDivElement>) {
		event.preventDefault();
		setIsDragging(false);

		if (event.target instanceof HTMLInputElement) {
			return;
		}

		if (event.dataTransfer.files.length > 0) {
			addFiles(Array.from(event.dataTransfer.files));
		}
	}

	function removeEntry(id: string) {
		setEntries((current) => current.filter((entry) => entry.id !== id));
	}

	function resetDialog() {
		setEntries([]);
		setIsDragging(false);
	}

	function handleOpenChange(nextOpen: boolean) {
		if (!nextOpen) {
			resetDialog();
		}
		setOpen(nextOpen);
	}

	function handleCancel() {
		resetDialog();
		setOpen(false);
	}

	function handleDone() {
		const completedFiles: FileRecord[] = entries
			.filter((entry) => entry.status === "done")
			.map((entry) => ({
				id: crypto.randomUUID(),
				fileName: entry.file.name,
				mimeType: entry.file.type,
				sizeBytes: entry.file.size,
				status: "active",
				createdAt: new Date(),
			}));

		if (completedFiles.length > 0) {
			toast.add({
				title: `${completedFiles.length} ${pluralize(completedFiles.length, "file")} uploaded`,
				type: "success",
			});
			router.refresh();
		}
		resetDialog();
		setOpen(false);
	}

	const uploadingCount = entries.filter(
		(entry) => entry.status === "uploading",
	).length;
	const completedCount = entries.filter(
		(entry) => entry.status === "done",
	).length;

	return (
		<Dialog open={open} onOpenChange={handleOpenChange}>
			<DialogTrigger
				render={
					<Button>
						<Upload />
						Upload file
					</Button>
				}
			/>
			<DialogContent className="sm:max-w-lg">
				<DialogHeader>
					<DialogTitle>Upload files</DialogTitle>
					<DialogDescription>
						Drag and drop files, or browse to select.
					</DialogDescription>
				</DialogHeader>

				<div className="flex min-h-0 flex-col gap-3">
					<div
						className={`relative flex items-center justify-center overflow-hidden rounded-lg border border-dashed text-center transition-colors ${
							entries.length === 0 ? "min-h-40 px-6 py-8" : "min-h-11 px-4 py-2"
						} ${
							isDragging
								? "border-primary bg-primary/5"
								: "border-border hover:border-primary/50"
						}`}
						onDragEnter={(event) => {
							event.preventDefault();
							setIsDragging(true);
						}}
						onDragOver={(event) => event.preventDefault()}
						onDragLeave={(event) => {
							if (
								!event.currentTarget.contains(
									event.relatedTarget as Node | null,
								)
							) {
								setIsDragging(false);
							}
						}}
						onDrop={handleDrop}
					>
						<input
							type="file"
							multiple
							aria-label="Choose files to upload"
							className="absolute inset-0 z-10 cursor-pointer opacity-0"
							onChange={handleInputChange}
						/>
						{entries.length === 0 ? (
							<div className="pointer-events-none flex flex-col items-center gap-2">
								<Upload className="size-6 text-muted-foreground" />
								<p className="text-sm font-medium">
									Drag files here, or click to browse
								</p>
								<p className="text-xs text-muted-foreground">
									Up to 25 MB per file
								</p>
							</div>
						) : (
							<p className="pointer-events-none text-sm font-medium">
								+ Add more files
							</p>
						)}
					</div>

					{entries.length > 0 && (
						<div className="max-h-64 overflow-y-auto rounded-lg border">
							<div className="divide-y">
								{entries.map((entry) => {
									const uploadedBytes = Math.round(
										(entry.progress / 100) * entry.file.size,
									);

									return (
										<div
											key={entry.id}
											className="grid grid-cols-[1rem_1fr_auto_auto_1.5rem] items-center gap-2.5 px-3 py-2"
										>
											<MimeIcon mimeType={entry.file.type} />
											<span className="min-w-0 truncate text-sm font-medium">
												{entry.file.name}
											</span>
											<span className="shrink-0 text-xs text-muted-foreground tabular-nums">
												{entry.status === "uploading"
													? `${formatFileSize(uploadedBytes)} / ${formatFileSize(entry.file.size)}`
													: formatFileSize(entry.file.size)}
											</span>
											{entry.status === "uploading" ? (
												<Spinner className="size-4 text-muted-foreground" />
											) : entry.status === "done" ? (
												<Badge variant="secondary">Uploaded</Badge>
											) : (
												<Badge variant="destructive">Too large</Badge>
											)}
											<Button
												variant="ghost"
												size="icon-sm"
												type="button"
												aria-label={`Remove ${entry.file.name}`}
												onClick={() => removeEntry(entry.id)}
											>
												<X />
											</Button>
										</div>
									);
								})}
							</div>
						</div>
					)}
				</div>

				<DialogFooter className="items-center sm:justify-between">
					<span className="text-sm text-muted-foreground">
						{completedCount} of {entries.length} uploaded
					</span>
					<div className="flex gap-2">
						<Button variant="outline" type="button" onClick={handleCancel}>
							Cancel
						</Button>
						<Button
							type="button"
							disabled={entries.length === 0 || uploadingCount > 0}
							onClick={handleDone}
						>
							Done
						</Button>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
