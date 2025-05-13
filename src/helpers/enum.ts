import { PaymentStatus } from "@prisma/client";

const getCustomerStatusPay = (paymentStatus: PaymentStatus) => {
  return {
    [PaymentStatus.paid]: "Pago",
    [PaymentStatus.processing]: "Processando",
    [PaymentStatus.refunded]: "Vencido",
    [PaymentStatus.created]: "Criado",
    [PaymentStatus.canceling]: "Cancelando",
    [PaymentStatus.canceled]: "Cancelado",
  }[paymentStatus];
};

export { getCustomerStatusPay };
