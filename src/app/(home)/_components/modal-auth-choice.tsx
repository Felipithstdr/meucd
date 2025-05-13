"use client";

import { useDisclosure } from "@heroui/react";
import Link from "next/link";

import Modal from "@/components/modal";
import { Button } from "@/components/ui/button";

import ModalRegister from "./modal-register";

interface PropsModal {
  params: {
    open: boolean;
    change: (isOpen: boolean) => void;
    onClose: (isOpen: boolean) => void;
    price: number;
    serviceId: number;
    description: string;
  };
}

const ModalAuthChoice = ({ params }: PropsModal) => {
  const { open, change } = params;

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  return (
    <>
      <Modal
        params={{
          title: "",
          open: open,
          size: "3xl",
          change: change,
          body: (
            <div className="flex flex-col items-center gap-6 p-6 text-center">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                Já é cliente?
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Escolha uma opção abaixo para continuar:
              </p>

              <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
                <Button
                  type="button"
                  className="w-full rounded-2xl bg-blue-600 px-6 py-3 text-white shadow transition hover:bg-blue-700 sm:w-48"
                >
                  <Link href="/login">Login</Link>
                </Button>
                <Button
                  type="button"
                  className="w-full cursor-pointer rounded-2xl border bg-gray-100 px-6 py-3 text-gray-800 shadow transition hover:bg-gray-200 sm:w-48 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
                  onClick={() => {
                    params.onClose(true);
                    onOpen();
                  }}
                >
                  Criar Conta
                </Button>
              </div>
            </div>
          ),
        }}
      />

      <ModalRegister
        params={{
          open: isOpen,
          change: onOpenChange,
          onClose: onClose,
          serviceId: params.serviceId,
          price: params.price,
          description: params.description,
        }}
      />
    </>
  );
};

export default ModalAuthChoice;
