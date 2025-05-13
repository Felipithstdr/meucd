"use client";

import { Spinner } from "@heroui/react";
import { useSession } from "next-auth/react";

import { ModeToggle } from "@/components/mode-toggle";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { AppSidebar } from "./app-sidebar";
import NavLinks from "./nav-links";

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const { status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner color="success" label="Carregando..." variant="gradient" />
      </div>
    );
  }
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center bg-white transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 dark:bg-[#101828]">
          <div className="flex w-full items-center px-4">
            {/* Adicionado w-full para expandir a largura */}
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <NavLinks />
            </div>
            <div className="ml-auto">
              {/* ml-auto empurra o Notification para a direita */}
              <ModeToggle />
            </div>
          </div>
        </header>
        <div className="flex h-full flex-1 flex-col gap-4 bg-[#F5F7FB] p-4 pt-0">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Sidebar;
