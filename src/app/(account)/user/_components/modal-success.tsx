"use client";

import {
  addToast,
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import jwt from "jsonwebtoken";
import { CheckIcon } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface JWTPayload {
  customerId: string;
  exp: number;
  isCustomer: boolean;
}

const ModalSuccess = () => {
  const searchParams = useSearchParams();
  const [isCustomer, setIsCustomer] = useState<boolean>(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    // Extrair o token da URL
    const token = searchParams.get("key");

    if (token) {
      try {
        // Decodificar o token
        const decoded = jwt.decode(token) as JWTPayload;

        if (decoded && decoded.customerId && decoded.exp) {
          const currentTime = Math.floor(Date.now() / 1000); // Tempo atual em segundos
          if (decoded.exp > currentTime) {
            // O token não expirou
            setIsCustomer(decoded.isCustomer);
            onOpen();
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
    } else {
      addToast({
        title: "Atenção",
        description: "Token não encontrado na URL.",
        color: "danger",
      });
    }
  }, [searchParams, onOpen]);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col">
              <div className="text-center">
                <CheckIcon size={60} className="inline w-14 text-green-500" />

                <h4 className="mt-2 text-xl font-semibold text-gray-800 dark:text-white">
                  Pagamento realizado com sucesso!
                </h4>
              </div>
            </ModalHeader>
            <ModalFooter>
              {isCustomer ? (
                <Button color="danger" variant="light" onPress={onClose}>
                  Fechar
                </Button>
              ) : (
                <Button
                  type="button"
                  className="w-full rounded-lg border-none bg-green-800 px-5 py-2.5 text-sm text-white outline-none hover:bg-green-700"
                  as={Link}
                  href={"/login"}
                >
                  Ir para login
                </Button>
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalSuccess;
