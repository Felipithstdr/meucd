"use client"

import { ScrollShadow } from "@heroui/react";
import { PaymentMethod, PaymentStatus } from "@prisma/client";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/helpers/mask";

import {
  PAYMENT_METHOD_ICONS,
} from "../_constants/payments";

interface LastTransactionsProps {
  lastTransactions: {
    id: number;
    name: string;
    status: PaymentStatus;
    paymentMethod: PaymentMethod;
    totalAmount: number;
    createdAt: Date;
  }[];
}

const LastTransactions = ({ lastTransactions }: LastTransactionsProps) => {

  const getAmountColor = (transaction: PaymentStatus) => {
    return transaction === "paid" ? "text-green-500" : "text-red-500";
  };

  const getAmountBorderColor = (transaction: PaymentStatus) => {
    return transaction === "paid" ? "border-green-500" : "border-red-500";
  };

  const getAmountPrefix = (transaction: PaymentStatus) => {
    return transaction === "paid" ? "+" : "-";
  };

  return (
    <ScrollShadow hideScrollBar className="h-auto">
      <Card className="w-full">
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="font-bold">Últimas Transações</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {lastTransactions.map((transaction) => (
            <div
              className="flex items-center justify-between"
              key={transaction.id}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`rounded-lg border ${getAmountBorderColor(transaction.status)} bg-white bg-opacity-[3%] p-3`}
                >
                  {transaction.paymentMethod &&
                    PAYMENT_METHOD_ICONS[
                      transaction.paymentMethod
                    ]}
                </div>
                <div>
                  <p className="text-sm">
                    <span className="font-serif text-lg">Cliente: </span>
                    <span className="text-base font-bold">
                      {transaction.name}
                    </span>
                  </p>
                  <p className="text-base text-muted-foreground">
                    {format(transaction.createdAt, "dd 'de' MMM. 'de' yyyy", {
                      locale: ptBR,
                    })}
                  </p>
                </div>
              </div>
              <p
                className={`text-base font-bold ${getAmountColor(transaction.status)}`}
              >
                {getAmountPrefix(transaction.status)}
                {formatCurrency(transaction.totalAmount)}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </ScrollShadow>
  );
};

export default LastTransactions;
