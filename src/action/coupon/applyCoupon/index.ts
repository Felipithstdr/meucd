"use server";

import db from "@/lib/prisma";

export async function applyCoupon(code: string) {
  const coupon = await db.coupon.findUnique({
    where: { code },
    include: { payments: true },
  });

  if (!coupon || !coupon.active) {
    return { error: "Cupom inválido ou inativo!" };
  }

  const timesUsed = coupon.payments.length;

  if (coupon.usageLimit && timesUsed >= coupon.usageLimit) {
    return { error: "Limite de uso atingido." };
  }

  return coupon.id;
}
