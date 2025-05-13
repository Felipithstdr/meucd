"use server";

import { revalidatePath } from "next/cache";

import db from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

interface CustomerData {
  name: string;
  email: string;
  cellPhone: string;
}

export const updateCustomer = async (customerData: CustomerData) => {
  const session = await getCurrentUser();

  if (!session) {
    throw new Error("Unauthorized");
  }

  try {
    const format_cellPhone = customerData.cellPhone.replace(/\D/g, "");

    const updateCustomer = await db.customer.update({
      where: {
        id: session.id,
      },
      data: {
        name: customerData.name,
        email: customerData.email,
        cellPhone: format_cellPhone,
      },
    });

    // Verifique se `updateCustomer` foi atualizado
    if (!updateCustomer) {
      return { error: `Erro ao atualizar` };
    }

    revalidatePath("/admin");
    revalidatePath("/user");
    revalidatePath("/login");
    return { success: "Atualizado com sucesso!" };
  } catch (error) {
    return { error: `Erro ao atualizar Cliente no banco de dados: ${error}` };
  }
};
