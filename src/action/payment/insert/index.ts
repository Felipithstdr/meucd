"use server";

import { PaymentStatus } from "@prisma/client";

import db from "@/lib/prisma";

interface CustomerData {
  customerId: string;
  paymentCode: string;
  serviceId: number;
  quantity: number;
  status: PaymentStatus;
}

export const createdPayment = async (customerData: CustomerData) => {
  try {
    const order = Math.floor(100000 + Math.random() * 900000).toString();

    //Criar pagamento
    const createdPayment = await db.payment.create({
      data: {
        customerId: customerData.customerId,
        order: order,
        paymentCode: customerData.paymentCode,
        serviceId: customerData.serviceId,
        quantity: customerData.quantity,
        status: customerData.status,
      },
    });

    return { success: createdPayment };
  } catch (error) {
    return { error: `Erro ao criar Pagamento no banco de dados: ${error}` };
  }
};
