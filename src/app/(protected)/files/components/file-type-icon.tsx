import {
	File,
	FileArchive,
	FileImage,
	FileSpreadsheet,
	FileText,
} from "lucide-react";

export function FileTypeIcon({ mimeType }: { mimeType: string }) {
	if (mimeType.startsWith("image/"))
		return <FileImage className="size-4 text-muted-foreground" />;
	if (mimeType === "application/pdf")
		return <FileText className="size-4 text-muted-foreground" />;
	if (mimeType.includes("spreadsheet") || mimeType === "text/csv")
		return <FileSpreadsheet className="size-4 text-muted-foreground" />;
	if (mimeType.includes("zip") || mimeType.includes("compressed"))
		return <FileArchive className="size-4 text-muted-foreground" />;
	return <File className="size-4 text-muted-foreground" />;
}
