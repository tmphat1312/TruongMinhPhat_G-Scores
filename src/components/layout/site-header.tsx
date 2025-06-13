"use client";

import { SidebarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useSidebar } from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function SiteHeader() {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="bg-primary text-primary-foreground sticky top-0 z-50 flex w-full items-center border-b">
      <div className="flex h-(--header-height) w-full items-center gap-2 px-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="size-8"
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              aria-label="Toggle sidebar"
            >
              <SidebarIcon className="size-6!" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Toggle sidebar (Ctrl + B)</p>
          </TooltipContent>
        </Tooltip>

        <Separator orientation="vertical" className="mr-2 h-4" />
        <h1 className="font-bold text-2xl text-center w-full tracking-wider">
          G-Scores
        </h1>
      </div>
    </header>
  );
}
