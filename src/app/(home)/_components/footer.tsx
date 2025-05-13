"use client";

import { Building2, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";

const Footer = () => {
  const date = new Date();
  const currentYear = date.getFullYear();

  return (
    <footer className="bg-gray-300 dark:border-t-2 dark:border-white dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 pb-6 pt-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <div className="flex items-center justify-center gap-x-4 sm:justify-start">
              <div className="relative -mt-20 h-64 w-64 sm:absolute sm:mt-0 sm:h-52 sm:w-52">
                <Image
                  src="/logo-light.png"
                  alt="Meu certificado digital logo"
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
            </div>

            <p className="-mt-15 max-w-md text-center leading-relaxed text-gray-500 sm:mt-12 sm:max-w-xs sm:text-left dark:text-gray-400">
              Facilitando a obtenção do seu Certificado Digital e abrindo portas
              para novos negócios e segurança digital.
            </p>
            <ul className="mt-8 flex justify-center gap-6 sm:justify-start md:gap-8">
              <li>
                <Link
                  href="https://www.instagram.com/meu_certificado_digital/"
                  rel="noreferrer"
                  target="_blank"
                  className="text-sky-700 transition hover:text-sky-700/75 dark:text-sky-300 dark:hover:text-sky-300/75"
                >
                  <span className="sr-only">Instagram</span>
                  <GrInstagram size={24} />
                </Link>
              </li>
            </ul>
          </div>

          <div className="-mt-14 grid grid-cols-1 gap-10 sm:mt-0 sm:grid-cols-3 md:grid-cols-4 lg:col-span-2">
            <div className="text-center sm:text-left"></div>
            <div className="text-center sm:text-left"></div>

            <div className="text-center sm:text-left">
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                Política
              </p>

              <ul className="mt-5 space-y-4 text-sm">
                <li>
                  <Link
                    href="/doc/termodereembolso.pdf"
                    target="_blank"
                    className="hover:text-blue-600 hover:underline"
                  >
                    Termo de desistência e reembolso
                  </Link>
                </li>
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                Contato
              </p>

              <ul className="mt-5 space-y-4 text-sm">
                <li>
                  <div className="flex items-center justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end">
                    <span className="flex-shrink-0">
                      <Mail />
                    </span>

                    <span className="flex-shrink-0 text-gray-700 dark:text-gray-300">
                      meucd@meucd.servicos.ws
                    </span>
                  </div>
                </li>

                <li>
                  <div className="flex items-center justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end">
                    <FaWhatsapp
                      size={24}
                      className="text-green-600 dark:text-lime-500"
                    />

                    <span className="flex-shrink-0 text-gray-700 dark:text-gray-300">
                      (51) 9 9132-9735
                    </span>
                  </div>
                </li>

                <li className="flex items-start justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end">
                  <Building2 />

                  <span className="flex-shrink-0 text-gray-700 dark:text-gray-300">
                    60.591.832/0001-51
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t-2 border-gray-500 pt-6 dark:border-gray-100">
          <div className="text-center sm:flex sm:justify-between sm:text-left">
            <p className="mt-4 text-sm text-gray-500 sm:order-first sm:mt-0 dark:text-gray-400">
              &copy; {currentYear}{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                Meu Certificado Digital
              </span>
              . Todos os direitos reservados
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
