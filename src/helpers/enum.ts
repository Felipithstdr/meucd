import { PaymentStatus } from "@prisma/client";

const getCustomerStatusPay = (paymentStatus: PaymentStatus) => {
  return {
    [PaymentStatus.paid]: "Pago",
    [PaymentStatus.pending]: "Pendente",
    [PaymentStatus.expired]: "Vencido",
    [PaymentStatus.waiting_payment]: "Aguardando",
  }[paymentStatus];
};

export { getCustomerStatusPay };
