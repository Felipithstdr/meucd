"use server";

import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";

import db from "@/lib/prisma";

interface CustomerData {
  email: string;
  password: string;
}

export const resetPassword = async (customerData: CustomerData) => {
  try {
    const customer = await db.customer.findUnique({
      where: {
        email: customerData.email,
      },
    });

    if (!customer) {
      return { error: "Usuário não encontrado" };
    }

    const hashedPassword = await bcrypt.hash(customerData.password, 10);

    await db.customer.update({
      where: {
        id: customer.id,
      },
      data: {
        password: hashedPassword,
      },
    });

    revalidatePath("/user");
    revalidatePath("/login");
    return { success: "Senha alterada com sucesso!" };
  } catch (error) {
    return { error: `Erro ao alterar senha: ${error}` };
  }
};
