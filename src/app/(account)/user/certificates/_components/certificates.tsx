"use client";

import { Card, CardBody, CardHeader, Chip, ScrollShadow } from "@heroui/react";
import { DigitalCertificate } from "@prisma/client";
import { format } from "date-fns";

interface CDPros {
  certificates: DigitalCertificate[];
}

const Certificates = ({ certificates }: CDPros) => {
  const cdStatusColor = (status: boolean) => {
    if (status === true) return "bg-lime-400 font-bold text-base";
    if (status === false) return "bg-red-400 font-bold text-base";
  };

  const cdStatus = (status: boolean) => {
    if (status === true) return "Ativo";
    if (status === false) return "Inativo";
  };

  const cdTypeColor = (cnpj: boolean) => {
    if (cnpj === true) return "bg-blue-400 font-bold text-base";
    if (cnpj === false) return "bg-orange-300 font-bold text-base";
  };

  return (
    <ScrollShadow
      hideScrollBar
      className="mb-12 h-full w-auto sm:mb-5 sm:px-6"
      offset={50}
    >
      <div className="p-6 px-6">
        <p className="mb-6 text-2xl font-bold text-black">Meus certificados</p>
        <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {certificates.map((certificate) => {
            return (
              <Card
                className="bg-white bg-opacity-5 dark:bg-gray-800"
                shadow="sm"
                key={certificate.id}
              >
                <CardHeader className="flex-row items-center gap-4">
                  <p className="font-black text-neutral-800 dark:text-white">
                    Certificado Digital
                  </p>
                </CardHeader>
                <CardBody>
                  <span className="font-black dark:text-white">
                    Certificado:{" "}
                    <Chip
                      className={`${cdTypeColor(!certificate.cnpj)}`}
                      size="sm"
                    >
                      {certificate.cnpj ? "eCNPJ" : "eCPF"}
                    </Chip>
                  </span>
                  <span className="font-black dark:text-white">
                    Status:{" "}
                    <Chip
                      className={`mt-2 ${cdStatusColor(certificate.isActive)}`}
                      size="sm"
                    >
                      {cdStatus(certificate.isActive)}
                    </Chip>
                  </span>

                  <div className="mt-1 text-sm text-black sm:text-base dark:text-white">
                    <span className="font-black">Expiração: </span>
                    <time dateTime={certificate.expirationDate?.toISOString()}>
                      {certificate.expirationDate
                        ? format(certificate.expirationDate, "dd/MM/yyyy")
                        : "Não ativo"}
                    </time>
                  </div>
                </CardBody>
              </Card>
            );
          })}
        </div>
      </div>
    </ScrollShadow>
  );
};

export default Certificates;
