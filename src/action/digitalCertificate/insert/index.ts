"use server";

import { revalidatePath } from "next/cache";

import { formatCurrency } from "@/helpers/mask";
import db from "@/lib/prisma";

interface CustomerData {
  customerId: string;
  serviceId: number;
  docs: string[];
}

export const createdCD = async (customerData: CustomerData) => {
  try {
    for (const doc of customerData.docs) {
      await db.digitalCertificate.create({
        data: {
          customerId: customerData.customerId,
          ecpf: customerData.serviceId === 1 ? doc : null,
          ecnpj: customerData.serviceId === 2 ? doc : null,
        },
      });
    }

    const customer = await db.customer.findUnique({
      where: {
        id: customerData.customerId,
      },
      include: {
        digitalCertificates: true,
      },
    });

    const totalPrice =
      customerData.serviceId === 1
        ? customerData.docs.length * 70
        : customerData.docs.length * 90;

    // Adicionar chamada ao webhook com dados do cliente
    const apiUrl = `${process.env.SEND_MESSAGE_CERTIFIER}`;
    try {
      await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer: customer?.name,
          number: customer?.cellPhone,
          service: customerData.serviceId === 1 ? "eCPF" : "eCNPJ",
          qtde: customerData.docs.length,
          price: formatCurrency(totalPrice),
          [customerData.serviceId === 1 ? "cpfs" : "cnpjs"]:
            customerData.docs.join(", "),
        }),
      });
    } catch (error) {
      console.error("Erro ao enviar mensagem a certificadora:", error);
    }

    revalidatePath("/user");
    return {
      success: "Cadastro realizado com sucesso e já notificado a certificadora",
    };
  } catch (error) {
    return { error: `Erro ao criar Pagamento no banco de dados: ${error}` };
  }
};
