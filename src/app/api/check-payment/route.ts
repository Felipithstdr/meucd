import { NextRequest, NextResponse } from "next/server";

import { updatePayment } from "@/action/payment/update";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { amount, id, status, payment_methods } = body?.data || {};

    // const netValue = Math.round(((amount - amount * 0.009) / 100) * 100) / 100;

    await updatePayment({
      paymentCode: id,
      event: status,
      paymentMethod: payment_methods[0],
      netValue: amount,
    });

    return NextResponse.json({ received: true });
  } catch (error) {
    // Se o erro for na leitura do body (teste do webhook)
    const msg =
      error instanceof SyntaxError ? "Webhook test OK" : `Erro: ${error}`;
    return NextResponse.json({ message: msg }, { status: 200 });
  }
}
