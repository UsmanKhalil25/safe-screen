"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { PaginationSchema } from "@/lib/schemas";
import { useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";

interface FilesPaginationProps {
  filesLength: number;
  pagination: PaginationSchema;
}

function FilesPagination({ filesLength, pagination }: FilesPaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = pagination.currentPage;
  const totalPages = Math.ceil(pagination.totalItems / pagination.itemsPerPage);
  

  console.log("Fileslength: ", filesLength);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const generatePaginationLinks = () => {
    const links = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    links.push(
      <PaginationItem key="prev">
        <PaginationPrevious
          href={`${pathname}?${createQueryString(
            "page",
            Math.max(1, currentPage - 1).toString()
          )}`}
          aria-disabled={currentPage <= 1}
          tabIndex={currentPage <= 1 ? -1 : undefined}
          className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
        />
      </PaginationItem>
    );

    if (startPage > 1) {
      links.push(
        <PaginationItem key={1}>
          <PaginationLink
            href={`${pathname}?${createQueryString("page", "1")}`}
            isActive={1 === currentPage}
          >
            1
          </PaginationLink>
        </PaginationItem>
      );
      if (startPage > 2) {
        links.push(
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
    }

    for (let page = startPage; page <= endPage; page++) {
      links.push(
        <PaginationItem key={page}>
          <PaginationLink
            href={`${pathname}?${createQueryString("page", page.toString())}`}
            isActive={page === currentPage}
          >
            {page}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        links.push(
          <PaginationItem key="ellipsis-end">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
      links.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            href={`${pathname}?${createQueryString(
              "page",
              totalPages.toString()
            )}`}
            isActive={totalPages === currentPage}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    links.push(
      <PaginationItem key="next">
        <PaginationNext
          href={`${pathname}?${createQueryString(
            "page",
            Math.min(totalPages, currentPage + 1).toString()
          )}`}
          aria-disabled={currentPage >= totalPages}
          tabIndex={currentPage >= totalPages ? -1 : undefined}
          className={
            currentPage >= totalPages ? "pointer-events-none opacity-50" : ""
          }
        />
      </PaginationItem>
    );

    return links;
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex items-center justify-between px-4 py-4 border-t">
      <div className="text-sm text-muted-foreground">
        Showing{" "}
        <strong>
          {pagination.itemsPerPage * (currentPage - 1) + 1}-
          {Math.min(
            pagination.itemsPerPage * currentPage,
            pagination.totalItems
          )}
        </strong>{" "}
        of <strong>{pagination.totalItems}</strong> files
      </div>

      <Pagination>
        <PaginationContent>{generatePaginationLinks()}</PaginationContent>
      </Pagination>
    </div>
  );
}

export { FilesPagination };
