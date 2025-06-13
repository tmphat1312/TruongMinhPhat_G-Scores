"use client";

import { ChartBar, LayoutDashboard, Search, Settings } from "lucide-react";
import * as React from "react";

import { NavMain } from "@/components/layout/nav-main";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: LayoutDashboard,
    },
    {
      title: "Search Scores",
      url: "/search-scores",
      icon: Search,
    },
    {
      title: "Reports",
      url: "/reports",
      icon: ChartBar,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      {...props}
    >
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
    </Sidebar>
  );
}
