"use client";

import { Chip, useDisclosure } from "@heroui/react";
import { PaymentStatus, Prisma } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { getCustomerStatusPay } from "@/helpers/enum";

import ModalViewCustomer from "./modal-view-customer";

export type Payment = Prisma.PaymentGetPayload<{
  include: {
    service: true;
    customer: {
      omit: {
        password: true;
        token: true;
        agreedToTerms: true;
      };
    };
  };
}>;

const ActionsCell = ({ row }: { row: { original: Payment } }) => {
  const paymentCode = row.original.paymentCode;

  const {
    isOpen: isOpenView,
    onOpen: onOpenView,
    onOpenChange: onOpenChangeView,
  } = useDisclosure();

  const [customerView, setCustomerView] = useState<string>();

  const modalView = (id: string) => {
    setCustomerView(id);
  };

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        onClick={() => {
          onOpenView();
          modalView(paymentCode);
        }}
        className="cursor-pointer dark:bg-[#101828] dark:hover:bg-blue-900"
      >
        <Eye className="dark:text-white" />
      </Button>

      {customerView && (
        <ModalViewCustomer
          params={{
            paymentCode: customerView,
            open: isOpenView,
            change: onOpenChangeView,
          }}
        />
      )}
    </>
  );
};

const paySatusColor = (status: PaymentStatus) => {
  if (status === "paid") return "bg-lime-400 font-bold text-base";
  if (status === "created") return "bg-yellow-300 font-bold text-base";
  if (status === "refunded") return "bg-orange-400";
  return "bg-red-500";
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "order",
    header: "Pedido",
  },
  {
    accessorKey: "customer.name",
    header: "Nome",
  },
  {
    accessorKey: "customer.cpf",
    header: "CPF",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const paymentStatus = row.original.status as PaymentStatus;

      const colorClassName = paySatusColor(paymentStatus);

      return (
        <div>
          <Chip className={`capitalize ${colorClassName}`}>
            {getCustomerStatusPay(paymentStatus)}
          </Chip>
        </div>
      );
    },
  },
  {
    accessorKey: "servico",
    header: "Certificado",
    cell: ({ row }) => {
      const service = row.original.service.name;

      return <span>{service}</span>;
    },
  },
  {
    id: "acoes",
    header: "Detalhes",
    enableHiding: false,
    cell: ActionsCell,
  },
];
