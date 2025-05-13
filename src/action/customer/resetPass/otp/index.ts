"use server";

import db from "@/lib/prisma";

export const validateOTP = async (email: string, otp: string) => {
  try {
    const customer = await db.customer.findUnique({
      where: {
        email,
      },
    });

    if (!customer) {
      return { error: "Usuário não encontrado" };
    }

    if (otp !== customer.token) {
      return { error: "Token inválido!" };
    }

    const now = new Date(Date.now());

    if (customer.tokenExpires && now > customer.tokenExpires) {
      return { error: "Token expirado!" };
    }
    return { success: "Código validado com sucesso!" };
  } catch (error) {
    return { error: `Erro ao validar OTP: ${error}` };
  }
};
