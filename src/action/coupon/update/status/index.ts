"use server";

import { revalidatePath } from "next/cache";

import db from "@/lib/prisma";

export const statusCoupon = async (id: number, status: boolean) => {
  try {
    const deleteCoupon = await db.coupon.update({
      where: {
        id,
      },
      data: {
        active: status,
      },
    });

    // Verifique se `deleteCoupon` foi criado
    if (!deleteCoupon) {
      return { error: `Falha ao tentar atualizar cupom` };
    }

    revalidatePath("/admin");
    revalidatePath("/");
    return { success: "Cupom atualizado com sucesso" };
  } catch (error) {
    return { error: `Erro ao deletar Cupom no banco de dados: ${error}` };
  }
};
