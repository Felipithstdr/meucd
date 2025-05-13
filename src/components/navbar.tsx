"use client";

import { Navbar, NavbarBrand } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

const NavBar = () => {
  return (
    <Navbar
      isBordered
      classNames={{
        base: "shadow-lg",
      }}
      isBlurred={false}
    >
      <NavbarBrand>
        <div className="relative h-32 w-32">
          <Link href="/">
            <Image
              src="/logo-light.png"
              alt="Meu certificado digital logo"
              fill
              className="object-contain"
            />
          </Link>
        </div>
      </NavbarBrand>
    </Navbar>
  );
};

export default NavBar;
