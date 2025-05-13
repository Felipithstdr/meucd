"use client";

import {
  addToast,
  Card,
  CardBody,
  CardHeader,
  useDisclosure,
} from "@heroui/react";
import { Prisma } from "@prisma/client";
import jwt from "jsonwebtoken";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import AssociatedForm from "./associated-form";
import ModalSuccess from "./modal-success";
import ModalTutorial from "./modal-tutorial";

interface CustomerProps {
  customer: Omit<
    Prisma.CustomerGetPayload<{
      include: {
        payments: {
          include: { service: true };
        };
        digitalCertificates: true;
      };
    }>,
    "password" | "token" | "agreedToTerms"
  >;
  formDataToRender: { serviceId: number; remaining: number }[];
}

interface JWTPayload {
  pay: boolean;
  exp: number;
}

const User = ({ customer, formDataToRender }: CustomerProps) => {
  const searchParams = useSearchParams();
  const [pay, setPay] = useState<boolean>(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    // Extrair o token da URL
    const token = searchParams.get("key");

    if (token) {
      try {
        // Decodificar o token
        const decoded = jwt.decode(token) as JWTPayload;

        if (decoded && decoded.pay && decoded.exp) {
          const currentTime = Math.floor(Date.now() / 1000); // Tempo atual em segundos
          if (decoded.exp > currentTime) {
            // O token não expirou
            setPay(decoded.pay);
          } else {
            // O token expirou
            addToast({
              title: "Atenção",
              description: "Erro: Token expirado.",
              color: "danger",
            });
          }
        } else {
          addToast({
            title: "Atenção",
            description:
              "Erro: Token inválido ou ausência de customerId ou exp.",
            color: "danger",
          });
        }
      } catch (err) {
        addToast({
          title: "Atenção",
          description: "Erro: " + err,
          color: "danger",
        });
      }
    }
  }, [searchParams]);

  useEffect(() => {
    if (customer.digitalCertificates.length === 0) {
      onOpen(); // Abre o modal assim que a condição é satisfeita
    }
  }, [customer.digitalCertificates.length, onOpen]);

  return (
    <>
      <ModalTutorial params={{ open: isOpen, change: onOpenChange }} />{" "}
      {pay && <ModalSuccess />}
      <div className="p-5 px-4 text-2xl text-black">
        Bem-Vindo ao{" "}
        <span className="text-blue-700">Meu Certificado Digital</span>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {formDataToRender.length > 0 ? (
          formDataToRender.map(({ serviceId, remaining }) => (
            <Card key={serviceId} className="bg-white" shadow="sm">
              <CardHeader className="flex-row items-center gap-4">
                <p className="text-neutral-600 dark:text-black">
                  Associar {serviceId === 1 ? "CPF" : "CNPJ"} ao seu certificado
                  ({remaining} restante{remaining > 1 ? "s" : ""})
                </p>
              </CardHeader>
              <CardBody>
                <AssociatedForm
                  params={{
                    serviceId,
                    quantity: remaining,
                    customerId: customer.id,
                  }}
                />
              </CardBody>
            </Card>
          ))
        ) : (
          <div className="mx-auto max-w-xl rounded-2xl bg-white p-6 text-zinc-800 shadow-md dark:bg-zinc-900 dark:text-zinc-100">
            <p className="mb-4 text-lg font-semibold">
              Você já registrou todos os seus certificados disponíveis no
              momento.
            </p>

            <ul className="space-y-4">
              <li>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  🔹 Quer comprar mais certificados?
                </span>
                <br />
                <span>
                  Acesse o menu lateral e clique em{" "}
                  <span className="italic">“Comprar certificados”</span>.
                </span>
              </li>
              <li>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  🔹 Quer acompanhar o status do seu certificado atual?
                </span>
                <br />
                <span>
                  Vá até <span className="italic">“Meus Certificados”</span> no
                  menu lateral.
                </span>
              </li>
              <li>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  🔹 Quer ver o histórico dos seus pedidos?
                </span>
                <br />
                <span>
                  Confira em <span className="italic">“Meus Pedidos”</span>.
                </span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default User;
