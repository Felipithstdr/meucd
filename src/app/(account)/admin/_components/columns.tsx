"use client";

import { Prisma } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { formatCellPhone } from "@/helpers/mask";


export type Customer = Prisma.CustomerGetPayload<{
  omit:{
    password: true;
    token: true;
    agreedToTerms: true
  }
}>

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
];
