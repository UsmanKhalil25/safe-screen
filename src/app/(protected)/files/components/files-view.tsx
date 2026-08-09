"use client";

import * as React from "react";

import { toast } from "@/components/ui/toast";

import { columns } from "./columns";
import type { FileRecord } from "../data";
import { DataTable } from "./data-table";
import { UploadDialog } from "./upload-dialog";

export function FilesView({ initialFiles }: { initialFiles: FileRecord[] }) {
	const [files, setFiles] = React.useState(initialFiles);

	function handleUploadComplete(uploadedFiles: FileRecord[]) {
		setFiles((current) => [...uploadedFiles, ...current]);
		toast.add({
			title: `${uploadedFiles.length} file${uploadedFiles.length === 1 ? "" : "s"} uploaded`,
			type: "success",
		});
	}

	return (
		<div className="flex flex-col gap-4 px-4 py-4 lg:px-6">
			<div className="flex items-center justify-between">
				<div>
					<h2 className="text-lg font-semibold">Files</h2>
					<p className="text-sm text-muted-foreground">
						Documents uploaded for candidate screening.
					</p>
				</div>
				<UploadDialog onUploadComplete={handleUploadComplete} />
			</div>
			<DataTable columns={columns} data={files} />
		</div>
	);
}
