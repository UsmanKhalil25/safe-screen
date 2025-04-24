import { Suspense } from "react";

import { FilesList } from "./components/files-list";
import { FilesSkeleton } from "./components/files-skeleton";
import { FilesSearch } from "./components/files-search";

export default async function FilesPage(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <div className="h-full flex flex-col gap-6 p-6 pt-0 max-w-7xl mx-auto">
      <div className="flex flex-col gap-2 mt-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Files</h1>
            <p className="text-muted-foreground">
              Here you can search and view all your files
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-4">
          <div className="relative flex-1">
            <FilesSearch />
          </div>
        </div>
      </div>

      <div className="rounded-md border h-full">
        <Suspense key={query + currentPage} fallback={<FilesSkeleton />}>
          <FilesList query={query} currentPage={currentPage} />
        </Suspense>
      </div>
    </div>
  );
}
