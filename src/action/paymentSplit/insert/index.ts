"use server";

import { SplitReceiverType } from "@prisma/client";

import db from "@/lib/prisma";

interface CustomerData {
  paymentId: number;
  amount: number;
  type: SplitReceiverType;
}

export const insertPaySplit = async (customerData: CustomerData) => {
  try {

    //Criar split
    const insertPaymentSplit = await db.paymentSplit.create({
      data: {
        paymentId: customerData.paymentId,
        amount: customerData.amount,
        type: customerData.type,
      },
    });

    return { success: insertPaymentSplit };
  } catch (error) {
    return { error: `Erro ao criar split no banco de dados: ${error}` };
  }
};
