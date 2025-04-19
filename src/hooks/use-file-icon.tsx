import { useMemo } from "react";
import {
  FileText,
  ImageIcon,
  File,
  FileAudio,
  FileVideo,
  Archive,
  SheetIcon,
  Binary,
  FileCode,
} from "lucide-react";

interface FileIconOption {
  fileName?: string;
  fileType?: string;
  size?: string;
  color?: string;
}

export function useFileIcon({
  fileName,
  fileType,
  size,
  color,
}: FileIconOption) {
  return useMemo(() => {
    const iconSize = size ?? "h-10 w-10";

    const lowerName = fileName?.toLowerCase() ?? "";
    const lowerType = fileType?.toLowerCase() ?? "";

    let defaultColor = "text-gray-500";

    if (lowerType.startsWith("image/")) {
      defaultColor = "text-blue-500";
    } else if (lowerType === "application/pdf" || lowerName.endsWith(".pdf")) {
      defaultColor = "text-red-500";
    } else if (
      lowerType.includes("word") ||
      lowerName.endsWith(".doc") ||
      lowerName.endsWith(".docx")
    ) {
      defaultColor = "text-blue-700";
    } else if (
      lowerType.startsWith("audio/") ||
      lowerName.endsWith(".mp3") ||
      lowerName.endsWith(".wav") ||
      lowerName.endsWith(".ogg")
    ) {
      defaultColor = "text-purple-500";
    } else if (
      lowerType.startsWith("video/") ||
      lowerName.endsWith(".mp4") ||
      lowerName.endsWith(".mov") ||
      lowerName.endsWith(".avi")
    ) {
      defaultColor = "text-orange-500";
    } else if (
      lowerType === "application/zip" ||
      lowerType === "application/x-zip-compressed" ||
      lowerName.endsWith(".zip") ||
      lowerName.endsWith(".rar") ||
      lowerName.endsWith(".7z")
    ) {
      defaultColor = "text-yellow-600";
    } else if (
      lowerType.includes("spreadsheet") ||
      lowerName.endsWith(".xls") ||
      lowerName.endsWith(".xlsx") ||
      lowerName.endsWith(".csv")
    ) {
      defaultColor = "text-green-600";
    } else if (
      lowerType.includes("binary") ||
      lowerName.endsWith(".exe") ||
      lowerName.endsWith(".dmg") ||
      lowerName.endsWith(".apk")
    ) {
      defaultColor = "text-gray-700";
    } else if (
      lowerType.includes("text/") ||
      lowerName.endsWith(".js") ||
      lowerName.endsWith(".ts") ||
      lowerName.endsWith(".html") ||
      lowerName.endsWith(".css") ||
      lowerName.endsWith(".py")
    ) {
      defaultColor = "text-pink-500";
    }

    const iconColor = color ?? defaultColor;
    const className = `${iconSize} ${iconColor}`;

    if (lowerType.startsWith("image/")) {
      return <ImageIcon className={className} />;
    } else if (lowerType === "application/pdf" || lowerName.endsWith(".pdf")) {
      return <FileText className={className} />;
    } else if (
      lowerType.includes("word") ||
      lowerName.endsWith(".doc") ||
      lowerName.endsWith(".docx")
    ) {
      return <FileText className={className} />;
    } else if (
      lowerType.startsWith("audio/") ||
      lowerName.endsWith(".mp3") ||
      lowerName.endsWith(".wav") ||
      lowerName.endsWith(".ogg")
    ) {
      return <FileAudio className={className} />;
    } else if (
      lowerType.startsWith("video/") ||
      lowerName.endsWith(".mp4") ||
      lowerName.endsWith(".mov") ||
      lowerName.endsWith(".avi")
    ) {
      return <FileVideo className={className} />;
    } else if (
      lowerType === "application/zip" ||
      lowerType === "application/x-zip-compressed" ||
      lowerName.endsWith(".zip") ||
      lowerName.endsWith(".rar") ||
      lowerName.endsWith(".7z")
    ) {
      return <Archive className={className} />;
    } else if (
      lowerType.includes("spreadsheet") ||
      lowerName.endsWith(".xls") ||
      lowerName.endsWith(".xlsx") ||
      lowerName.endsWith(".csv")
    ) {
      return <SheetIcon className={className} />;
    } else if (
      lowerType.includes("binary") ||
      lowerName.endsWith(".exe") ||
      lowerName.endsWith(".dmg") ||
      lowerName.endsWith(".apk")
    ) {
      return <Binary className={className} />;
    } else if (
      lowerType.includes("text/") ||
      lowerName.endsWith(".js") ||
      lowerName.endsWith(".ts") ||
      lowerName.endsWith(".html") ||
      lowerName.endsWith(".css") ||
      lowerName.endsWith(".py")
    ) {
      return <FileCode className={className} />;
    }

    return <File className={className} />;
  }, [fileName, fileType, size, color]);
}
