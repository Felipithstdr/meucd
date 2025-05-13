import { PaymentStatus } from "@prisma/client";

const PAYMENT_STATUS_OPTIONS = [
  {
    value: PaymentStatus.waiting_payment,
    label: "Aguardando",
  },
  {
    value: PaymentStatus.expired,
    label: "Vencido",
  },
  {
    value: PaymentStatus.paid,
    label: "Pago",
  },
  {
    value: PaymentStatus.pending,
    label: "Pendente",
  },
];

const PAYMENT_METHOD_LABELS = {
  credit_card: "Cartão de Crédito",
  pix: "Pix",
};

export { PAYMENT_METHOD_LABELS, PAYMENT_STATUS_OPTIONS };
