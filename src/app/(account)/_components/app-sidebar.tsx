"use client";

import { Divider } from "@heroui/react";
import {
  FileKey,
  Home,
  ListOrdered,
  LogOutIcon,
  ShieldCheck,
  TicketPercent,
  UserRound,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

import { NavBrand } from "./nav-brand";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";

const dataSidebar = {
  commonItems: {
    home: {
      title: "Início",
      icon: Home,
    },
  },

  customerItems: [
    {
      title: "Perfil",
      url: "/user/profile",
      icon: UserRound,
    },
    {
      title: "Comprar Certificado",
      url: "/user/buy-certificates",
      icon: ShieldCheck,
    },
    {
      title: "Meus certificados",
      url: "/user/certificates",
      icon: FileKey,
    },
    {
      title: "Pedidos",
      url: "/user/orders",
      icon: ListOrdered,
    },
  ],

  adminItems: [
    {
      title: "Cupom",
      url: "/admin/coupon",
      icon: TicketPercent,
    },
  ],
};

function getNavItems(fl_role: number) {
  const items = [];

  if (fl_role === 2) {
    // Cliente
    items.push({
      ...dataSidebar.commonItems.home,
      url: "/user",
    });
    items.push(...dataSidebar.customerItems);
  } else if ([0, 1].includes(fl_role)) {
    // Admin
    items.push({
      ...dataSidebar.commonItems.home,
      url: "/admin",
    });

    // Adicionar outros itens do admin
    items.push(...dataSidebar.adminItems);

    // Filtrar dashboard se fl_role for 0
    if (fl_role === 0) {
      return items.filter((item) => item.url !== "/admin/dashboard");
    }
  }

  return items;
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data } = useSession();

  if (!data) {
    return null;
  }

  const fl_role = data?.user.fl_role;
  const navItems = getNavItems(fl_role);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavBrand />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} />
        <Divider orientation="horizontal" className="bg-black dark:bg-white" />
        <NavMain
          items={[
            {
              title: "Sair",
              icon: LogOutIcon,
              onClick: () => signOut({ callbackUrl: "/login" }),
            },
          ]}
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
