"use client";

import { Card, CardBody, CardHeader, Chip, ScrollShadow } from "@heroui/react";
import { PaymentStatus, Prisma } from "@prisma/client";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import React from "react";

import { getCustomerStatusPay } from "@/helpers/enum";

interface PaymentProps {
  payments: Prisma.PaymentGetPayload<{
    include: {
      service: true;
    };
  }>[];
}

const Orders = ({ payments }: PaymentProps) => {
  const paySatusColor = (status: PaymentStatus) => {
    if (status === "paid") return "bg-lime-400 font-bold text-base";
    if (status === "pending") return "bg-yellow-300 font-bold text-base";
    if (status === "expired") return "bg-orange-400";
    return "bg-red-500";
  };

  return (
    <ScrollShadow
      hideScrollBar
      className="mb-8 h-full w-auto sm:mb-5 sm:px-6"
      offset={50}
    >
      <div className="p-6 px-6">
        <p className="mb-6 text-2xl font-bold text-black">Meus Pedidos</p>
        <div className="mt-4 grid grid-cols-2 gap-3 pb-8">
          {payments
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime(),
            )
            .map((payment) => (
              <React.Fragment key={payment.id}>
                <Card className="bg-white bg-opacity-5" shadow="sm">
                  <CardHeader className="flex-row items-center gap-4">
                    <p className="text-neutral-600 dark:text-black">
                      Pagamento
                    </p>
                  </CardHeader>
                  <CardBody>
                    <Chip
                      className={`${paySatusColor(payment.status as PaymentStatus)} uppercase`}
                    >
                      {getCustomerStatusPay(payment.status)}
                    </Chip>
                    <span className="mt-3 text-sm text-gray-500 sm:text-lg">
                      Pedido: #{payment.order}
                    </span>

                    <span className="hidden text-sm text-gray-500 sm:block sm:text-lg">
                      Data do pagamento:{" "}
                      {format(new Date(payment.createdAt), "dd/MM/yyyy", {
                        locale: ptBR,
                      })}
                    </span>
                    <span className="block text-sm text-gray-500 sm:hidden sm:text-lg">
                      Pago em:{" "}
                      {format(new Date(payment.createdAt), "dd/MM/yyyy", {
                        locale: ptBR,
                      })}
                    </span>
                  </CardBody>
                </Card>

                {/* Card de Certificado Digital */}
                <Card className="bg-white bg-opacity-5" shadow="sm">
                  <CardHeader className="flex-row items-center gap-4">
                    <p className="text-neutral-600 dark:text-black">
                      Certificado Digital
                    </p>
                  </CardHeader>
                  <CardBody>
                    <Chip className="Capitalize">{payment.service.name}</Chip>
                    <span className="mt-3 text-sm text-gray-500 sm:text-lg">
                      Quantidade: {payment.quantity}
                    </span>
                  </CardBody>
                </Card>
              </React.Fragment>
            ))}
        </div>
      </div>
    </ScrollShadow>
  );
};

export default Orders;
