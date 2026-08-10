import type { FileRecord } from "@/lib/contracts/files";

import { FileDetailHeader } from "./components/file-detail-header";
import { FilePreviewPanel } from "./components/file-preview-panel";

// TODO(phase 2): fetch the real file by id instead of this mock.
const MOCK_FILE: FileRecord = {
	id: "file_7bNw2VqL",
	fileName: "Q3-board-deck.pdf",
	mimeType: "application/pdf",
	sizeBytes: 2_202_009,
	status: "active",
	createdAt: new Date("2026-07-28T15:04:00Z"),
};

export default async function FileDetailPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	void id;

	return (
		<div className="flex flex-col gap-4 px-4 py-4 lg:px-6">
			<div className="overflow-hidden rounded-md border">
				<FileDetailHeader file={MOCK_FILE} />
				<FilePreviewPanel file={MOCK_FILE} />
			</div>
		</div>
	);
}
