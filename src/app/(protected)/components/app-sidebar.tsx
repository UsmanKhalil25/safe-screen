"use client";

import {
	BarChart3,
	Folder,
	HelpCircle,
	LayoutDashboard,
	ListChecks,
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

const data = {
	navMain: [
		{
			title: "Dashboard",
			url: "/",
			icon: LayoutDashboard,
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
							render={<Link href="/" />}
							className="data-[slot=sidebar-menu-button]:p-1.5!"
						>
							<Sparkles className="size-5!" />
							<span className="text-base font-semibold">Safe Screen</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
				<NavSecondary items={data.navSecondary} className="mt-auto" />
			</SidebarContent>
			<SidebarFooter>
				<NavUser />
			</SidebarFooter>
		</Sidebar>
	);
}
