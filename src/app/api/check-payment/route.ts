import { NextRequest, NextResponse } from "next/server";

import { updatePayment } from "@/action/payment/update";
import db from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    console.log(body);

    const { value, id, integration_id } = body?.data || {};
    console.log(body.data);
    console.log(body.data.id);
    console.log(integration_id);

    // const netValue = Math.round(((amount - amount * 0.009) / 100) * 100) / 100;

    const payment = await updatePayment({
      paymentCode: id,
      event: "paid",
      paymentMethod: "pix",
      netValue: value,
    });

    if (integration_id) {
      const customer = await db.customer.findUnique({
        where: {
          id: payment.data?.customerId,
        },
      });
      // Adicionar chamada ao webhook com dados do cliente
      const apiUrl = `${process.env.WH_TUTORIAL}`;
      try {
        await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customer: customer?.name,
            number: customer?.cellPhone,
          }),
        });
      } catch (error) {
        console.error("Erro ao enviar mensagem a certificadora:", error);
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    // Se o erro for na leitura do body (teste do webhook)
    const msg =
      error instanceof SyntaxError ? "Webhook test OK" : `Erro: ${error}`;
    return NextResponse.json({ message: msg }, { status: 200 });
  }
}
