"use client";

import Image from "next/image";
import Link from "next/link";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";

import DrawerMobile from "./drawer-mobile";

const NavBar = () => {
  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-900">
        <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
          <Link
            href="#home"
            className="flex items-center space-x-3 text-black rtl:space-x-reverse"
          >
            <div className="absolute h-32 w-32">
              <Image
                src="/logo-light.png"
                alt="Logo meu certificado digital"
                fill
                className="block object-contain dark:hidden"
              />
              <Image
                src="/logo-dark2.png"
                alt="Logo meu certificado digital"
                fill
                className="hidden object-contain dark:block"
              />
            </div>
          </Link>
          <div className="flex space-x-3 md:order-2 md:space-x-1 rtl:space-x-reverse">
            <Button
              asChild
              className="rounded-lg bg-blue-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <Link href="/login">Login</Link>
            </Button>
            <ModeToggle />
            <div className="block sm:hidden">
              <DrawerMobile />
            </div>
          </div>
          <div
            className="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto"
            id="navbar-sticky"
          >
            <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 rtl:space-x-reverse dark:border-gray-700 dark:bg-gray-800 md:dark:bg-gray-900">
              <li>
                <a
                  href="#home"
                  className="block rounded-sm px-3 py-2 text-gray-900 hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                >
                  Início
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="block rounded-sm px-3 py-2 text-gray-900 hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                >
                  Sobre
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="block rounded-sm px-3 py-2 text-gray-900 hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                >
                  Serviços
                </a>
              </li>
              <li>
                <a
                  href="#promotion"
                  className="block rounded-sm px-3 py-2 text-gray-900 hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                >
                  Promoções
                </a>
              </li>
              <li>
                <Link
                  href="#certificates"
                  className="block rounded-sm px-3 py-2 text-gray-900 hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                >
                  Certificados
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
