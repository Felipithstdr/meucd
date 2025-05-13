"use client";

import { Menu } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const DrawerMobile = () => {
  const menuItems = [
    { label: "Início", href: "#home" },
    { label: "Sobre", href: "#about" },
    { label: "Serviços", href: "#services" },
    { label: "Promoções", href: "#promotion" },
    { label: "Certificados", href: "#certificates" },
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-xl font-black">Menu</SheetTitle>
          <SheetDescription />
        </SheetHeader>
        <div className="flex flex-col space-y-4 px-6">
          {menuItems.map((item, index) => (
            <div key={`${item.label}-${index}`} className="w-full">
              {item.label === "Login" ? (
                <Link
                  className="bg-green-strong inline-flex w-full items-center justify-center rounded-xl px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-sky-300"
                  href={item.href}
                >
                  {item.label}
                </Link>
              ) : (
                <SheetClose asChild>
                  <Link
                    className="text-foreground w-full hover:underline"
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </SheetClose>
              )}
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default DrawerMobile;
