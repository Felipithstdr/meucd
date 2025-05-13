import { PaymentStatus } from "@prisma/client";

const PAYMENT_STATUS_OPTIONS = [
  {
    value: PaymentStatus.processing,
    label: "Processando",
  },
  {
    value: PaymentStatus.refunded,
    label: "Reembolso",
  },
  {
    value: PaymentStatus.paid,
    label: "Pago",
  },
  {
    value: PaymentStatus.canceled,
    label: "Cancelado",
  },
];

const PAYMENT_METHOD_LABELS = {
  credit_card: "Cartão de Crédito",
  pix: "Pix",
};

export { PAYMENT_METHOD_LABELS, PAYMENT_STATUS_OPTIONS };
