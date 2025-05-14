import { NextResponse } from "next/server";

import { createdPayment } from "@/action/payment/insert";
import db from "@/lib/prisma";

export async function POST(req: Request) {
  const api_auth =
    process.env.NODE_ENV === "development"
      ? `${process.env.URL_TRANS_LOGIN_DESENV}/authorization`
      : `${process.env.URL_TRANS_LOGIN_PROD}/authorization`;

  const api_pay =
    process.env.NODE_ENV === "development"
      ? `${process.env.URL_TRANSFEERA_DESENV}/pix/qrcode/collection/immediate`
      : `${process.env.URL_TRANSFEERA_PROD}/pix/qrcode/collection/immediate`;

  const client_id =
    process.env.NODE_ENV === "development"
      ? process.env.CLIENT_ID_TRANSFEERA_DESENV
      : process.env.CLIENT_ID_TRANSFEERA_PROD;

  const client_secret =
    process.env.NODE_ENV === "development"
      ? process.env.CLIENT_SECRET_TRANSFEERA_DESENV
      : process.env.CLIENT_SECRET_TRANSFEERA_PROD;

  const pix_key =
    process.env.NODE_ENV === "development"
      ? process.env.PIX_DESENV
      : process.env.PIX_PROD;

  try {
    const data = await req.json();

    const totalPrice = calculateDiscount(data.price, data.quantity);

    const options_auth = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "User-Agent": "URBE.PAY (backoffice@iroll.com.br)",
      },
      body: JSON.stringify({
        grant_type: "client_credentials",
        client_id,
        client_secret,
      }),
    };

    const response = await fetch(api_auth, options_auth);
    const tokenTransfeera = await response.json();

    const customer = await db.customer.findUnique({
      where: {
        id: data.customerId,
      },
      select: {
        name: true,
        cpf: true,
      },
    });

    const options_pay = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${tokenTransfeera.access_token}`,
        accept: "application/json",
        "content-type": "application/json",
        "User-Agent": "URBE.PAY (backoffice@iroll.com.br)",
      },
      body: JSON.stringify({
        payer: { name: customer?.name, document: customer?.cpf },
        expiration: 86400,
        value_change_mode: "VALOR_FIXADO",
        integration_id: data.customerId,
        pix_key,
        original_value: totalPrice.totalWithDiscount,
        payer_question: `Certificado ${data.description}`,
        reject_unknown_payer: false,
      }),
    };

    const res_once = await fetch(api_pay, options_pay);
    const dataPay = await res_once.json();

    await createdPayment({
      customerId: data.customerId,
      paymentCode: dataPay.txid,
      serviceId: data.serviceId,
      quantity: data.quantity,
    });

    return NextResponse.json(dataPay, { status: 200 });
  } catch (error) {
    console.log("Erro ao chamar a API do Transfeera:", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

const calculateDiscount = (unitPrice: number, quantity: number) => {
  let discountPercentage = 0;

  // Define as faixas de desconto
  if (quantity >= 2 && quantity <= 3) {
    discountPercentage = 10; // 10% de desconto para 2-3 itens
  } else if (quantity >= 4 && quantity <= 7) {
    discountPercentage = 15; // 15% de desconto para 4-7 itens
  } else if (quantity >= 8) {
    discountPercentage = 25; // 25% de desconto para 8 ou mais
  }

  // Calcula o preço com desconto
  const totalWithoutDiscount = unitPrice * quantity;
  const discountAmount = totalWithoutDiscount * (discountPercentage / 100);
  const totalWithDiscount = totalWithoutDiscount - discountAmount;

  return {
    totalWithDiscount,
  };
};
