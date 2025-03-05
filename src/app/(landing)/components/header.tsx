import Link from "next/link";
import { Menu, Shield } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  {
    path: "#features",
    label: "Features",
  },
  {
    path: "#how-it-works",
    label: "How it works",
  },
  {
    path: "#pricing",
    label: "Pricing",
  },
];

function Header() {
  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8">
      <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <Link href="#" prefetch={false}>
              <Shield className="h-6 w-6" />
            </Link>
            <div className="grid gap-2 py-6">
              {NAV_LINKS.map((link, index) => (
                <Link
                  key={index}
                  href={link.path}
                  className="flex w-full items-center py-2 text-lg font-semibold"
                  prefetch={false}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
        <Link href="#" className="mr-6 hidden lg:flex" prefetch={false}>
          <Shield className="h-6 w-6" />
        </Link>
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            {NAV_LINKS.map((link, index) => (
              <NavigationMenuLink asChild key={index}>
                <Link
                  href={link.path}
                  className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                  prefetch={false}
                >
                  {link.label}
                </Link>
              </NavigationMenuLink>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <div className="ml-auto flex gap-2">
          <Button asChild variant="outline">
            <Link href="/login" prefetch={true}>
              Login
            </Link>
          </Button>
          <Button asChild>
            <Link href="/sign-up" prefetch={true}>
              Get Started
            </Link>
          </Button>
        </div>
      </header>
    </div>
  );
}

export { Header };
