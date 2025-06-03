import { z } from "zod";
import { cookies } from "next/headers";
import { formatDistanceToNow } from "date-fns";
import {
  FileIcon,
  FileTextIcon,
  ImageIcon,
  VideoIcon,
  FileSearch,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { API_ENDPOINTS, HTTP_METHOD } from "@/constants";
import { apiClient } from "@/lib/api/client";
import { fileSchema, paginationSchema } from "@/lib/schemas";
import { FilesPagination } from "./files-pagination";

interface FilesListProps {
  query: string;
  currentPage: number;
}

const filesResponseSchema = z.object({
  data: z.array(fileSchema),
  pagination: paginationSchema,
});

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return (
    Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  );
}

function getFileIcon(mimetype: string) {
  if (mimetype.startsWith("image/")) {
    return <ImageIcon className="h-4 w-4" />;
  } else if (mimetype.startsWith("video/")) {
    return <VideoIcon className="h-4 w-4" />;
  } else if (mimetype.startsWith("text/") || mimetype === "application/pdf") {
    return <FileTextIcon className="h-4 w-4" />;
  } else {
    return <FileIcon className="h-4 w-4" />;
  }
}

export async function FilesList({ query, currentPage }: FilesListProps) {
  const cookieHeader = (await cookies()).toString();

  const response = await apiClient({
    url: API_ENDPOINTS.FILES.BASE,
    method: HTTP_METHOD.GET,
    params: {
      query,
      page: currentPage,
    },
    headers: { Cookie: cookieHeader },
  });

  const json = await response.json();
  const parsed = filesResponseSchema.safeParse(json);

  if (!parsed.success) {
    return null;
  }
  const files = parsed.data.data;
  const pagination = parsed.data.pagination;

  if (files.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center gap-2">
        <FileSearch className="w-10 h-10 text-muted-foreground" />
        <p className="text-muted-foreground">No files found</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col justify-between">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Updated</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {files.map((file) => (
            <TableRow key={file.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  {getFileIcon(file.mimetype)}
                  {file.name}
                </div>
              </TableCell>
              <TableCell>{file.mimetype}</TableCell>
              <TableCell>{formatFileSize(file.size)}</TableCell>
              <TableCell>
                {formatDistanceToNow(file.createdAt, { addSuffix: true })}
              </TableCell>
              <TableCell>
                {formatDistanceToNow(file.updatedAt, { addSuffix: true })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <FilesPagination pagination={pagination} filesLength={files.length} />
    </div>
  );
}
