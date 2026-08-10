import { MimeIcon } from "@/components/ui/mime-icon";
import type { FileRecord } from "@/lib/contracts/files";
import { formatDate, formatFileSize } from "@/lib/utils";

function MetaCell({ label, value }: { label: string; value: string }) {
	return (
		<div className="border-r px-4 py-3 last:border-r-0">
			<p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
				{label}
			</p>
			<p className="mt-1 truncate text-sm">{value}</p>
		</div>
	);
}

export function FilePreviewPanel({ file }: { file: FileRecord }) {
	return (
		<>
			<div className="flex flex-col items-center gap-3 bg-muted/40 px-6 py-16">
				<MimeIcon
					mimeType={file.mimeType}
					className="size-12 text-muted-foreground"
				/>
				<div className="text-center">
					<p className="text-sm font-medium">{file.fileName}</p>
					<p className="text-xs text-muted-foreground">Preview coming soon</p>
				</div>
			</div>
			<div className="grid grid-cols-2 border-t sm:grid-cols-4">
				<MetaCell label="Type" value={file.mimeType} />
				<MetaCell label="Size" value={formatFileSize(file.sizeBytes)} />
				<MetaCell label="Uploaded" value={formatDate(file.createdAt)} />
				<MetaCell label="File ID" value={file.id} />
			</div>
		</>
	);
}
