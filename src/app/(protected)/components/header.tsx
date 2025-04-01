import { Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { MainLogo } from "@/components/ui/main-logo";

import { UserNav } from "./user-nav";

function Header() {
  return (
    <div className="sticky top-0 z-50 backdrop-blur-lg bg-white/70 dark:bg-gray-950/70 border-b border-gray-200 dark:border-gray-800">
      <header className="container h-16 mx-auto flex w-full shrink-0 items-center px-4 md:px-6 ">
        <div className="flex items-center gap-2">
          <MainLogo className="mr-6" />
          <span className="text-lg font-bold">SafeScreen</span>
        </div>

        <div className="ml-auto flex items-center gap-4">
          <Button variant="outline" size="icon" className="hidden md:flex">
            <Upload className="h-4 w-4" />
            <span className="sr-only">Upload file</span>
          </Button>
          <UserNav />
        </div>
      </header>
    </div>
  );
}

export { Header };
