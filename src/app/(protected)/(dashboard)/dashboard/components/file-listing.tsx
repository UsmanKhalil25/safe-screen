"use client";

import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Card, CardContent } from "@/components/ui/card";
import {
  File,
  FileText,
  ImageIcon,
  Music,
  Video,
  FileArchive,
  FileQuestion,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

// This would come from your database
type FileType = {
  id: string;
  name: string;
  mimetype: string;
  path: string;
  size: number;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

// Mock data for demonstration
const mockFiles: FileType[] = Array.from({ length: 50 }).map((_, i) => ({
  id: `file-${i}`,
  name: `File ${i}.${["pdf", "jpg", "docx", "mp3", "mp4", "zip"][i % 6]}`,
  mimetype: [
    "application/pdf",
    "image/jpeg",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "audio/mpeg",
    "video/mp4",
    "application/zip",
  ][i % 6],
  path: `/files/file-${i}`,
  size: Math.floor(Math.random() * 10000000),
  userId: "user-1",
  createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
  updatedAt: new Date(),
}));

function FilesListing() {
  const [currentPage, setCurrentPage] = useState(1);
  const filesPerPage = 10;
  const totalPages = Math.ceil(mockFiles.length / filesPerPage);

  const paginatedFiles = mockFiles.slice(
    (currentPage - 1) * filesPerPage,
    currentPage * filesPerPage
  );

  // Function to get the appropriate icon based on mimetype
  const getFileIcon = (mimetype: string) => {
    if (mimetype.startsWith("image/")) return <ImageIcon className="h-5 w-5" />;
    if (mimetype.startsWith("video/")) return <Video className="h-5 w-5" />;
    if (mimetype.startsWith("audio/")) return <Music className="h-5 w-5" />;
    if (mimetype.includes("pdf")) return <File className="h-5 w-5" />;
    if (mimetype.includes("word") || mimetype.includes("text"))
      return <FileText className="h-5 w-5" />;
    if (mimetype.includes("zip") || mimetype.includes("archive"))
      return <FileArchive className="h-5 w-5" />;
    return <FileQuestion className="h-5 w-5" />;
  };

  // Function to format file size
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Files</h2>
      <Card>
        <CardContent className="p-0">
          <ScrollArea className="h-[500px] rounded-md">
            <div className="p-4">
              {paginatedFiles.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center p-3 border-b last:border-0 hover:bg-muted/50 transition-colors"
                >
                  <div className="mr-3 text-muted-foreground">
                    {getFileIcon(file.mimetype)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{file.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatFileSize(file.size)} •{" "}
                      {formatDistanceToNow(file.createdAt, { addSuffix: true })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <div className="mt-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) setCurrentPage(currentPage - 1);
                }}
                className={
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>

            {Array.from({ length: totalPages }).map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(i + 1);
                  }}
                  isActive={currentPage === i + 1}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                }}
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}

export { FilesListing };
