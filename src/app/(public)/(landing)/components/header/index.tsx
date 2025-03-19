import Link from "next/link";
import { Menu } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { MainLogo } from "@/components/ui/main-logo";
import { SECTION_IDS } from "../../constants";

const prefixHash = (id: string) => `#${id}`;

const NAV_LINKS = [
  {
    path: prefixHash(SECTION_IDS.FEATURES),
    label: "Features",
  },
  {
    path: prefixHash(SECTION_IDS.HOW_IT_WORKS),
    label: "How it works",
  },
  {
    path: prefixHash(SECTION_IDS.TESTIMONIALS),
    label: "Testimonials",
  },
  {
    path: prefixHash(SECTION_IDS.PRICING),
    label: "Pricing",
  },
];
function Header() {
  return (
    <div className="sticky top-0 z-50 backdrop-blur-lg bg-white/70 dark:bg-gray-950/70 border-b border-gray-200 dark:border-gray-800">
      <header className="container h-16 mx-auto flex w-full shrink-0 items-center px-4 md:px-6 ">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>
                <MainLogo />
              </SheetTitle>
              <SheetDescription className="grid gap-4 py-6">
                {NAV_LINKS.map((link, index) => (
                  <Link
                    key={index}
                    href={link.path}
                    className="text-lg font-semibold text-primary"
                    prefetch={false}
                  >
                    {link.label}
                  </Link>
                ))}
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
        <MainLogo className="mr-6 hidden lg:flex" />
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
