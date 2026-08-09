"use client";

import {
	BarChart3,
	Files,
	Folder,
	HelpCircle,
	LayoutDashboard,
	ListChecks,
	Plug,
	Settings,
	Sparkles,
	Users,
} from "lucide-react";
import Link from "next/link";
import * as React from "react";

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";

import { NavMain } from "./nav-main";
import { NavSecondary } from "./nav-secondary";
import { NavUser } from "./nav-user";

export const navItems = {
	navMain: [
		{
			title: "Dashboard",
			url: "/dashboard",
			icon: LayoutDashboard,
		},
		{
			title: "Files",
			url: "/files",
			icon: Files,
		},
		{
			title: "Integrations",
			url: "/integrations",
			icon: Plug,
		},
		{
			title: "Lifecycle",
			url: "#",
			icon: ListChecks,
		},
		{
			title: "Analytics",
			url: "#",
			icon: BarChart3,
		},
		{
			title: "Projects",
			url: "#",
			icon: Folder,
		},
		{
			title: "Team",
			url: "#",
			icon: Users,
		},
	],
	navSecondary: [
		{
			title: "Settings",
			url: "#",
			icon: Settings,
		},
		{
			title: "Get Help",
			url: "#",
			icon: HelpCircle,
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							render={<Link href="/dashboard" />}
							className="data-[slot=sidebar-menu-button]:p-1.5!"
						>
							<Sparkles className="size-5!" />
							<span className="text-base font-semibold">Safe Screen</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={navItems.navMain} />
				<NavSecondary items={navItems.navSecondary} className="mt-auto" />
			</SidebarContent>
			<SidebarFooter>
				<NavUser />
			</SidebarFooter>
		</Sidebar>
	);
}
