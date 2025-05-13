"use client";

import { type LucideIcon } from "lucide-react";
import Link from "next/link";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url?: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
    onClick?: () => void;
  }[];
}) {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            {item.url ? (
              <Link href={item.url} passHref>
                <SidebarMenuButton
                  tooltip={item.title}
                  className="cursor-pointer"
                >
                  {item.icon && (
                    <item.icon className="text-black dark:text-white" />
                  )}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </Link>
            ) : (
              <SidebarMenuButton
                tooltip={item.title}
                onClick={() => {
                  item.onClick?.();
                }}
                className="cursor-pointer"
              >
                {item.icon && <item.icon color="red" />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            )}
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
