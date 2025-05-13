import { addDays, format } from "date-fns";
// import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

import { createdPayment } from "@/action/payment/insert";

export async function POST(req: Request) {
  const api_auth =
    process.env.NODE_ENV === "development"
      ? `${process.env.URL_TRANS_LOGIN_DESENV}/authorization`
      : `${process.env.URL_TRANS_LOGIN_PROD}/authorization`;

  const api_pay =
    process.env.NODE_ENV === "development"
      ? `${process.env.URL_TRANSFEERA_DESENV}/payment_links`
      : `${process.env.URL_TRANSFEERA_PROD}/payment_links`;

  try {
    const data = await req.json();

    // const today = new Date();
    // Adicione 1 dia à data de hoje
    // const tomorrow = addDays(today, 1);

    const totalPrice = calculateDiscount(data.price, data.quantity);

    // Dados para incluir no token (tokenJWT)
    // const tokenJWT = {
    //   customerId: data.customerId,
    //   pay: true,
    //   isCustomer: true,
    // };

    // const secretKey = process.env.JWT_SECRET;

    // // Gerar o token JWT
    // const token = jwt.sign(tokenJWT, secretKey, {
    //   expiresIn: "8m", // time token 8 min
    // });

    const options_auth = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "User-Agent": "URBE.PAY (backoffice@iroll.com.br)",
      },
      body: JSON.stringify({
        grant_type: "client_credentials",
        client_id: process.env.CLIENT_ID_TRANSFEERA_DESENV,
        client_secret: process.env.CLIENT_SECRET_TRANSFEERA_DESENV,
      }),
    };

    const response = await fetch(api_auth, options_auth);
    const tokenTransfeera = await response.json();

    const expires_at = format(
      addDays(new Date(), 2),
      "yyyy-MM-dd'T'HH:mm:ss.SSSX",
    );

    const options_pay = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${tokenTransfeera.access_token}`,
        accept: "application/json",
        "content-type": "application/json",
        "User-Agent": "URBE.PAY (backoffice@iroll.com.br)",
      },
      body: JSON.stringify({
        payment_methods: ["pix"],
        amount: totalPrice,
        name: data.name,
        expires_at,
      }),
    };

    const res_once = await fetch(api_pay, options_pay);
    const dataPay = await res_once.json();

    await createdPayment({
      customerId: dataPay.customer,
      paymentCode: dataPay.id,
      serviceId: data.serviceId,
      quantity: data.quantity,
      status: "pending",
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
