import { DiscountType } from "@prisma/client";

export const COUPON_TYPE_OPTIONS = [
  {
    value: DiscountType.FIXED,
    label: "Valor Fixo",
  },
  {
    value: DiscountType.PERCENTAGE,
    label: "Porcentagem",
  },
];
