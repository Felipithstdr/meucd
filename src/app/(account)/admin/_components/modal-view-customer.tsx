"use client";

import { Accordion, AccordionItem, Chip } from "@heroui/react";
import { Prisma } from "@prisma/client";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Copy } from "lucide-react";
import Link from "next/link";

import Modal from "@/components/modal";
import { Button } from "@/components/ui/button";
import { useFetch } from "@/hooks/use-fetch";

interface PropsModal {
  params: {
    open: boolean;
    change: (isOpen: boolean) => void;
    customerId: string;
  };
}

export type CustomerProps = Prisma.DigitalCertificateGetPayload<{
  include: {
    customer: {
      omit: {
        password: true;
        token: true;
        agreedToTerms: true;
      };
    };
  };
}>[];

const ModalViewCustomer = ({ params }: PropsModal) => {
  const { open, customerId, change } = params;

  const { data: customer, isLoading } = useFetch<CustomerProps>(
    `${process.env.NEXT_PUBLIC_HOST_URL}/api/customer/certificates?customerId=${customerId}`,
  );

  if (isLoading || !customer) {
    return null;
  }

  const cdTypeColor = (ecnpj: boolean) => {
    if (ecnpj === true) return "bg-blue-400 font-bold text-base";
    if (ecnpj === false) return "bg-orange-300 font-bold text-base";
  };

  const cdStatusColor = (status: boolean) => {
    if (status === true) return "bg-lime-400 font-bold text-base";
    if (status === false) return "bg-red-400 font-bold text-base";
  };

  const cdStatus = (status: boolean) => {
    if (status === true) return "Ativo";
    if (status === false) return "Inativo";
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Modal
      params={{
        id: customerId,
        title: `Certificados do cliente ${customer[0].customer.name}`,
        open: open,
        size: "2xl",
        change: change,
        body: (
          <div className="flex flex-col items-center gap-6 p-6 text-center">
            <Accordion variant="splitted">
              {customer.map((certificate) => (
                <AccordionItem
                  key={certificate.id}
                  isCompact
                  aria-label={certificate.ecnpj ? "eCNPJ" : "eCPF"}
                  title={
                    <div className="flex w-full items-center justify-between">
                      <Chip
                        className={cdTypeColor(!certificate.ecnpj)}
                        size="sm"
                      >
                        {certificate.ecnpj ? "eCNPJ" : "eCPF"}
                      </Chip>
                      <span className="ml-2 text-xs font-medium text-gray-500">
                        <Chip
                          className={`mt-2 ${cdStatusColor(certificate.isActive)}`}
                          size="sm"
                        >
                          {cdStatus(certificate.isActive)}
                        </Chip>
                      </span>
                    </div>
                  }
                  subtitle={
                    certificate.ecnpj ? certificate.ecnpj : certificate.ecpf
                  }
                >
                  <div className="space-y-2 text-sm text-black">
                    <div className="flex justify-between">
                      <p className="flex items-center gap-1">
                        <span>
                          <span className="font-semibold">Protocolo:</span>{" "}
                          {certificate.protocol}
                        </span>
                        {certificate.protocol && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="cursor-pointer p-1 text-blue-500 hover:bg-transparent"
                            onClick={() => handleCopy(certificate.protocol!)}
                            aria-label="Copiar Protocolo"
                          >
                            <Copy size={12} />
                          </Button>
                        )}
                      </p>

                      <p className="flex items-center gap-1">
                        <span className="font-semibold">
                          Código de emissão:
                        </span>{" "}
                        {certificate.issueCode}
                        {certificate.issueCode && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="cursor-pointer p-1 text-blue-500 hover:bg-transparent"
                            onClick={() => handleCopy(certificate.issueCode!)}
                            aria-label="Copiar Código de Emissão"
                          >
                            <Copy size={12} />
                          </Button>
                        )}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p>
                        <span className="font-semibold">Link:</span>{" "}
                        {certificate.link ? (
                          <Link
                            href={certificate.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Acessar
                          </Link>
                        ) : (
                          "N/A"
                        )}
                      </p>
                      <p>
                        <span className="font-semibold">Expiração:</span>{" "}
                        {certificate.expirationDate
                          ? format(
                              new Date(certificate.expirationDate),
                              "dd/MM/yyyy",
                              { locale: ptBR },
                            )
                          : "N/A"}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="flex items-center gap-1">
                        <span className="font-semibold">CPF:</span>{" "}
                        {certificate.customer.cpf}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="cursor-pointer p-1 text-blue-500 hover:bg-transparent"
                          onClick={() => handleCopy(certificate.customer.cpf!)}
                          aria-label="Copiar CPF"
                        >
                          <Copy size={12} />
                        </Button>
                      </p>
                      <p className="flex items-center gap-1">
                        <span className="font-semibold">Criado em:</span>{" "}
                        {format(new Date(certificate.createdAt), "dd/MM/yyyy", {
                          locale: ptBR,
                        })}
                      </p>
                    </div>
                  </div>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ),
      }}
    />
  );
};

export default ModalViewCustomer;
