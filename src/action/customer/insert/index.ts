"use server";

import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";

import { formatCamelCase } from "@/helpers/mask";
import db from "@/lib/prisma";

interface CustomerData {
  name: string;
  cpf: string;
  email: string;
  mobilePhone: string;
  password: string;
  agreedToTerms: boolean;
}

export const createCustomer = async (customerData: CustomerData) => {
  try {
    const hashedPassword = await bcrypt.hash(customerData.password, 10);

    const createdCustomer = await db.customer.create({
      data: {
        name: formatCamelCase(customerData.name),
        cpf: customerData.cpf,
        email: customerData.email,
        agreedToTerms: customerData.agreedToTerms,
        cellPhone: customerData.mobilePhone,
        password: hashedPassword,
      },
    });

    // Verifique se `createdCustomer` foi criado
    if (!createdCustomer) {
      throw new Error("Falha ao tentar criar usuário");
    }

    revalidatePath("/admin");
    revalidatePath("/user");
    revalidatePath("/login");
    return { success: createdCustomer };
  } catch (error) {
    return { error: `Erro ao criar Cliente no banco de dados: ${error}` };
  }
};
