"use client";

import { useDisclosure } from "@heroui/react";
import { Prisma } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Eye } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { formatCellPhone } from "@/helpers/mask";

import ModalViewCustomer from "./modal-view-customer";


export type Customer = Prisma.CustomerGetPayload<{
  omit:{
    password: true;
    token: true;
    agreedToTerms: true
  }
}>

const ActionsCell = ({ row }: { row: { original: Customer } }) => {
  const customerId = row.original.id;

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
          modalView(customerId);
        }}
        className="cursor-pointer dark:bg-[#101828] dark:hover:bg-blue-900"
      >
        <Eye className="dark:text-white" />
      </Button>

      {customerView && (
        <ModalViewCustomer
          params={{
            customerId,
            open: isOpenView,
            change: onOpenChangeView,
          }}
        />
      )}
    </>
  );
};

export const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "cpf",
    header: "CPF",
  },
  {
    accessorKey: "email",
    header: "E-mail",
  },
  {
    accessorKey: "cellPhone",
    header: "Celular",
    cell: ({ row }) => {
      const cellPhone = row.original.cellPhone;

      return <span>{formatCellPhone(cellPhone)}</span>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Criado Em",
    cell: ({ row }) => {
      const date = row.original.createdAt;
      const formattedDate = format(new Date(date), 'dd/MM/yyyy', { locale: ptBR });
  
      return <span>{formattedDate}</span>;
    },
  },
  {
    id: "acoes",
    header: "Detalhes",
    enableHiding: false,
    cell: ActionsCell,
  },
];
