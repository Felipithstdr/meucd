import { NextRequest, NextResponse } from "next/server";

import { updatePayment } from "@/action/payment/update";
import db from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { value, txid } = body?.data || {};

    // const netValue = Math.round(((amount - amount * 0.009) / 100) * 100) / 100;

    const payment = await updatePayment({
      paymentCode: txid,
      event: "paid",
      paymentMethod: "pix",
      netValue: value,
    });

    console.log(txid);

    if (txid) {
      const customer = await db.customer.findUnique({
        where: {
          id: payment.data?.customerId,
        },
      });

      console.log(customer);

      // Adicionar chamada ao webhook com dados do cliente
      const apiUrl = `${process.env.WH_TUTORIAL}`;
      console.log(apiUrl);

      try {
        await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customer: customer?.name,
            cellPhone: customer?.cellPhone,
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
