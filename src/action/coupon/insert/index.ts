"use server";

import { DiscountType } from "@prisma/client";
import { revalidatePath } from "next/cache";

import db from "@/lib/prisma";

interface CouponData {
  code: string;
  discountType: DiscountType;
  discountValue: number;
  active: boolean;
  usageLimit?: string | null;
}

export const createCoupon = async (couponData: CouponData) => {
  try {
    const verifyCode = await db.coupon.findUnique({
      where: {
        code: couponData.code,
      },
    });

    if (verifyCode) {
      return { error: "Já existe um cupom com esse código" };
    }

    const convertUsageLimit = couponData.usageLimit
      ? Number(couponData.usageLimit)
      : null;

    const createdCoupon = await db.coupon.create({
      data: {
        code: couponData.code,
        discountType: couponData.discountType,
        discountValue: couponData.discountValue,
        active: couponData.active,
        usageLimit: convertUsageLimit,
      },
    });

    // Verifique se `createdCoupon` foi criado
    if (!createdCoupon) {
      throw new Error("Falha ao tentar criar cupom");
    }

    revalidatePath("/admin");
    revalidatePath("/");
    return { success: "Cupom criado com sucesso" };
  } catch (error) {
    return { error: `Erro ao criar Cupom no banco de dados: ${error}` };
  }
};
