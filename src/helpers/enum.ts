import { PaymentStatus } from "@prisma/client";

const getCustomerStatusPay = (paymentStatus: PaymentStatus) => {
  return {
    [PaymentStatus.paid]: "Pago",
    [PaymentStatus.processing]: "Processando",
    [PaymentStatus.refunded]: "Vencido",
    [PaymentStatus.created]: "Pendente",
    [PaymentStatus.canceling]: "Cancelando",
    [PaymentStatus.canceled]: "Cancelado",
    [PaymentStatus.transfer]: "Transferência",
    [PaymentStatus.test]: "Teste",
  }[paymentStatus];
};

export { getCustomerStatusPay };
