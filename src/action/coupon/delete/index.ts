"use server";

import { revalidatePath } from "next/cache";

import db from "@/lib/prisma";

export const deleteCoupon = async (id: number) => {
  try {
    const deleteCoupon = await db.coupon.delete({
      where: {
        id,
      },
    });

    // Verifique se `deleteCoupon` foi criado
    if (!deleteCoupon) {
      return { error: `Falha ao tentar deletar cupom.` };
    }

    revalidatePath("/admin");
    revalidatePath("/");
    return { success: "Cupom deletado com sucesso!" };
  } catch (error) {
    return { error: `Erro ao deletar Cupom no banco de dados: ${error}` };
  }
};
