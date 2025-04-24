"use client";

import { useDebouncedCallback } from "use-debounce";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

const DEBOUNCE_TIME = 300;

function FilesSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, DEBOUNCE_TIME);

  return (
    <>
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <form>
        <Input
          type="search"
          placeholder="Search files..."
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={searchParams.get("query")?.toString()}
          className="pl-8"
        />
      </form>
    </>
  );
}

export { FilesSearch };
