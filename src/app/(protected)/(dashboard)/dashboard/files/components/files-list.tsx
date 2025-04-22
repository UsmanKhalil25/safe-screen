import { z } from "zod";
import { cookies } from "next/headers";
import { formatDistanceToNow } from "date-fns";
import { FileIcon, FileTextIcon, ImageIcon, VideoIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { API_ENDPOINTS, HTTP_METHOD } from "@/constants";
import { apiClient } from "@/lib/api/client";
import { fileSchema, paginationSchema } from "@/lib/schemas";

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
  console.log(parsed);
  const files = parsed.data.data;
  const pagination = parsed.data.pagination;

  const { totalItems, totalPages, itemsPerPage } = pagination;

  if (files.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <p className="text-muted-foreground">No files found</p>
      </div>
    );
  }

  return (
    <>
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

      <div className="flex items-center justify-between px-4 py-4 border-t">
        <div className="text-sm text-muted-foreground">
          Showing <strong>{files.length}</strong> of{" "}
          <strong>{totalItems}</strong> files
        </div>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={
                  currentPage > 1
                    ? `/files?page=${currentPage - 1}${
                        query ? `&query=${query}` : ""
                      }`
                    : "#"
                }
                aria-disabled={currentPage <= 1}
                className={
                  currentPage <= 1 ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>

            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              const pageNumber = i + 1;
              // Show first page, last page, current page, and pages around current
              const shouldShowPage =
                pageNumber === 1 ||
                pageNumber === totalPages ||
                (pageNumber >= currentPage - 1 &&
                  pageNumber <= currentPage + 1);

              if (!shouldShowPage && pageNumber === 2) {
                return (
                  <PaginationItem key="ellipsis-start">
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }

              if (!shouldShowPage && pageNumber === totalPages - 1) {
                return (
                  <PaginationItem key="ellipsis-end">
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }

              if (shouldShowPage) {
                return (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      href={`/files?page=${pageNumber}${
                        query ? `&query=${query}` : ""
                      }`}
                      isActive={pageNumber === currentPage}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                );
              }

              return null;
            })}

            <PaginationItem>
              <PaginationNext
                href={
                  currentPage < totalPages
                    ? `/files?page=${currentPage + 1}${
                        query ? `&query=${query}` : ""
                      }`
                    : "#"
                }
                aria-disabled={currentPage >= totalPages}
                className={
                  currentPage >= totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
}
