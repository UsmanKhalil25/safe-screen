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

export function useFileIcon(inputFile: File | null) {
  return useMemo(() => {
    const className = "h-10 w-10";

    if (!inputFile)
      return <FileText className={`${className} text-muted-foreground`} />;

    const { type, name } = inputFile;
    const lowerName = name.toLowerCase();

    if (type.startsWith("image/")) {
      return <ImageIcon className={`${className} text-blue-500`} />;
    }

    if (type === "application/pdf" || lowerName.endsWith(".pdf")) {
      return <FileText className={`${className} text-red-500`} />;
    }

    if (
      type.includes("word") ||
      lowerName.endsWith(".doc") ||
      lowerName.endsWith(".docx")
    ) {
      return <FileText className={`${className} text-blue-700`} />;
    }

    if (
      type.startsWith("audio/") ||
      lowerName.endsWith(".mp3") ||
      lowerName.endsWith(".wav") ||
      lowerName.endsWith(".ogg")
    ) {
      return <FileAudio className={`${className} text-purple-500`} />;
    }

    if (
      type.startsWith("video/") ||
      lowerName.endsWith(".mp4") ||
      lowerName.endsWith(".mov") ||
      lowerName.endsWith(".avi")
    ) {
      return <FileVideo className={`${className} text-orange-500`} />;
    }

    if (
      type === "application/zip" ||
      type === "application/x-zip-compressed" ||
      lowerName.endsWith(".zip") ||
      lowerName.endsWith(".rar") ||
      lowerName.endsWith(".7z")
    ) {
      return <Archive className={`${className} text-yellow-600`} />;
    }

    if (
      type.includes("spreadsheet") ||
      lowerName.endsWith(".xls") ||
      lowerName.endsWith(".xlsx") ||
      lowerName.endsWith(".csv")
    ) {
      return <SheetIcon className={`${className} text-green-600`} />;
    }

    if (
      type.includes("binary") ||
      lowerName.endsWith(".exe") ||
      lowerName.endsWith(".dmg") ||
      lowerName.endsWith(".apk")
    ) {
      return <Binary className={`${className} text-gray-700`} />;
    }

    if (
      type.includes("text/") ||
      lowerName.endsWith(".js") ||
      lowerName.endsWith(".ts") ||
      lowerName.endsWith(".html") ||
      lowerName.endsWith(".css") ||
      lowerName.endsWith(".py")
    ) {
      return <FileCode className={`${className} text-pink-500`} />;
    }

    return <File className={`${className} text-gray-500`} />;
  }, [inputFile]);
}
