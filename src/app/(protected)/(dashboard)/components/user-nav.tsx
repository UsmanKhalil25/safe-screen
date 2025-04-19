"use client";
import { signOut } from "next-auth/react";

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export function UserNav({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}) {
  const { isMobile } = useSidebar();

  const handleLogOut = () => {
    signOut({ callbackUrl: `${process.env.NEXT_PUBLIC_APP_URL}/login` });
  };

  const DROPDOWN_OPTIONS = [
    {
      label: "Upgrade to Pro",
      icon: <Sparkles />,
      action: () => console.log("Upgrade to Pro"),
      group: "top",
    },
    {
      label: "Account",
      icon: <BadgeCheck />,
      action: () => console.log("Account"),
      group: "main",
    },
    {
      label: "Billing",
      icon: <CreditCard />,
      action: () => console.log("Billing"),
      group: "main",
    },
    {
      label: "Notifications",
      icon: <Bell />,
      action: () => console.log("Notifications"),
      group: "main",
    },
    {
      label: "Log out",
      icon: <LogOut />,
      action: handleLogOut,
      group: "bottom",
    },
  ];

  const getGroupedItems = (groupName: string) =>
    DROPDOWN_OPTIONS.filter((item) => item.group === groupName);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>

            {getGroupedItems("top").length > 0 && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  {getGroupedItems("top").map(({ label, icon, action }) => (
                    <DropdownMenuItem key={label} onSelect={action}>
                      {icon}
                      <span className="ml-2">{label}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
              </>
            )}

            {getGroupedItems("main").length > 0 && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  {getGroupedItems("main").map(({ label, icon, action }) => (
                    <DropdownMenuItem key={label} onSelect={action}>
                      {icon}
                      <span className="ml-2">{label}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
              </>
            )}

            {getGroupedItems("bottom").length > 0 && (
              <>
                <DropdownMenuSeparator />
                {getGroupedItems("bottom").map(({ label, icon, action }) => (
                  <DropdownMenuItem key={label} onSelect={action}>
                    {icon}
                    <span className="ml-2">{label}</span>
                  </DropdownMenuItem>
                ))}
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
