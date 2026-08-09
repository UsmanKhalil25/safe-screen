"use client";

import { useRouter } from "next/navigation";

import { toast } from "@/components/ui/toast";
import type { FileRecord } from "@/lib/contracts/files";

import { UploadDialog } from "./upload-dialog";

export function UploadFilesButton() {
	const router = useRouter();

	function handleUploadComplete(files: FileRecord[]) {
		toast.add({
			title: `${files.length} file${files.length === 1 ? "" : "s"} uploaded`,
			type: "success",
		});
		router.refresh();
	}

	return <UploadDialog onUploadComplete={handleUploadComplete} />;
}
