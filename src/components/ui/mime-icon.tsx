import {
	File,
	FileArchive,
	FileAudio,
	FileCode,
	FileImage,
	FileJson,
	FileSpreadsheet,
	FileText,
	FileType,
	FileVideo,
	Presentation,
} from "lucide-react";

const CODE_MIME_TYPES = new Set([
	"application/javascript",
	"application/typescript",
	"application/xml",
	"text/javascript",
	"text/typescript",
	"text/jsx",
	"text/tsx",
	"text/html",
	"text/css",
	"text/x-python",
	"text/x-java",
	"text/x-c",
	"text/x-sh",
]);

const DOCUMENT_MIME_TYPES = new Set([
	"application/msword",
	"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
	"application/vnd.oasis.opendocument.text",
	"application/rtf",
]);

const PRESENTATION_MIME_TYPES = new Set([
	"application/vnd.ms-powerpoint",
	"application/vnd.openxmlformats-officedocument.presentationml.presentation",
	"application/vnd.oasis.opendocument.presentation",
]);

export function MimeIcon({
	mimeType,
	className = "size-4 shrink-0 text-muted-foreground",
}: {
	mimeType: string;
	className?: string;
}) {
	if (mimeType.startsWith("image/")) return <FileImage className={className} />;
	if (mimeType.startsWith("audio/")) return <FileAudio className={className} />;
	if (mimeType.startsWith("video/")) return <FileVideo className={className} />;
	if (mimeType.startsWith("font/") || mimeType.includes("font"))
		return <FileType className={className} />;
	if (mimeType.includes("spreadsheet") || mimeType === "text/csv")
		return <FileSpreadsheet className={className} />;
	if (PRESENTATION_MIME_TYPES.has(mimeType))
		return <Presentation className={className} />;
	if (
		mimeType.includes("zip") ||
		mimeType.includes("compressed") ||
		mimeType.includes("tar") ||
		mimeType.includes("gzip")
	)
		return <FileArchive className={className} />;
	if (mimeType === "application/json")
		return <FileJson className={className} />;
	if (CODE_MIME_TYPES.has(mimeType)) return <FileCode className={className} />;
	if (
		DOCUMENT_MIME_TYPES.has(mimeType) ||
		mimeType === "application/pdf" ||
		mimeType.startsWith("text/")
	)
		return <FileText className={className} />;
	return <File className={className} />;
}
