"use server";

import { PaymentMethod, PaymentStatus } from "@prisma/client";

import db from "@/lib/prisma";

interface PaymentData {
  paymentCode?: string;
  paymentMethod?: string;
  event?: string;
  netValue?: number;
  serviceId?: number;
}

export const updatePayment = async (paymentData: PaymentData) => {
  try {
    const updateData: {
      totalAmount?: number;
      status?: PaymentStatus;
      paymentMethod?: PaymentMethod;
      serviceId?: number;
      paymentCode?: string;
    } = {};

    if (paymentData.netValue !== undefined) {
      updateData.totalAmount = paymentData.netValue;
    }
    if (paymentData.event !== undefined) {
      updateData.status = paymentData.event as PaymentStatus;
    }
    if (paymentData.paymentMethod !== undefined) {
      updateData.paymentMethod = paymentData.paymentMethod as PaymentMethod;
    }

    if (paymentData.serviceId !== undefined) {
      updateData.serviceId = paymentData.serviceId;
    }

    if (paymentData.paymentCode !== undefined) {
      updateData.paymentCode = paymentData.paymentCode;
    }

    const pay = await db.payment.update({
      where: {
        paymentCode: paymentData.paymentCode,
      },
      data: updateData,
    });

    return { success: true, data: pay };
  } catch (error) {
    return { error: `Erro ao atualizar Payment no banco de dados: ${error}` };
  }
};
