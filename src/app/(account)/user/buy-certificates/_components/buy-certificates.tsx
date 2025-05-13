"use client";

import { Button } from "@heroui/button";
import { useDisclosure } from "@heroui/react";
import { useState } from "react";

import ModalChoose from "./modal-choose";

const BuyCertificates = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [serviceId, setServiceId] = useState(0);
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const handleOpen = (
    serviceId: number,
    price: number,
    description: string,
  ) => {
    setServiceId(serviceId);
    setPrice(price);
    setDescription(description);
    onOpen();
  };

  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
        <div className="mx-auto mb-8 max-w-screen-md text-center lg:mb-12">
          <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900">
            Escolha o seu Certificado Digital
          </h2>
        </div>
        <div className="flex flex-col items-center justify-center space-y-8 lg:flex-row lg:space-y-0">
          {/* <!-- Pricing Card --> */}
          <div className="mx-auto flex max-w-sm flex-col rounded-lg border border-gray-100 bg-white p-6 text-center text-gray-900 shadow-md xl:p-8 dark:border-gray-600 dark:bg-gray-800 dark:text-white">
            <h3 className="mb-4 text-2xl font-semibold">eCPF</h3>
            <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
              Para quem precisa de assinatura digital e acessos com segurança.
            </p>
            <div className="my-8 flex items-baseline justify-center">
              <span className="mr-2 text-5xl font-extrabold">R$ 129,90</span>
            </div>
            <Button
              size="sm"
              className="dark:hover:blue-700 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600"
              onPress={() => handleOpen(1, 129.9, "eCPF")}
            >
              Comprar
            </Button>
          </div>
          {/* <!-- Pricing Card --> */}
          <div className="mx-auto flex max-w-sm flex-col rounded-lg border border-gray-100 bg-white p-6 text-center text-gray-900 shadow-md xl:p-8 dark:border-gray-600 dark:bg-gray-800 dark:text-white">
            <h3 className="mb-4 text-2xl font-semibold">eCNPJ</h3>
            <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
              Para sua empresa emitir notas fiscais e cumprir as obrigações
              fiscais.
            </p>
            <div className="my-8 flex items-baseline justify-center">
              <span className="mr-2 text-5xl font-extrabold">R$ 189,90</span>
            </div>
            <Button
              size="sm"
              className="dark:hover:blue-700 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600"
              onPress={() => handleOpen(2, 189.9, "eCNPJ")}
            >
              Comprar
            </Button>
          </div>
        </div>
      </div>
      <ModalChoose
        params={{
          open: isOpen,
          change: onOpenChange,
          onClose: onClose,
          price: price,
          serviceId: serviceId,
          description: description,
        }}
      />
    </section>
  );
};

export default BuyCertificates;
