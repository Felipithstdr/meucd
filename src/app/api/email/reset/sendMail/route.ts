import { compile } from "handlebars";
import { NextRequest, NextResponse } from "next/server";

import { sendMail } from "@/lib/mailer";
import db from "@/lib/prisma";
import { resetTemplate } from "@/templates/resetPass/reset";

export async function POST(req: NextRequest) {
  const data = await req.json();

  const customer = await db.customer.findUnique({
    where: {
      email: data.email,
    },
  });

  if (!customer) {
    return new NextResponse(JSON.stringify({ message: "E-mail não existe" }), {
      status: 401,
    });
  }

  const from = {
    name: "Meu.CD",
    address: "meucd@meucd.servicos.ws",
  };

  const recipients = {
    name: customer.name,
    address: customer.email ?? "",
  };

  const template = compile(resetTemplate);

  const token = Math.floor(0x100000 + Math.random() * 0xeffff)
    .toString(16)
    .toUpperCase();

  const tokenFormatado = token.slice(0, 3) + " - " + token.slice(3);

  const now = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes expires

  await db.customer.update({
    where: {
      id: customer.id,
    },
    data: {
      token: token,
      tokenExpires: now,
    },
  });

  try {
    const sender = await sendMail({
      from,
      recipients,
      subject: "Reset de senha",
      html: template({
        name: customer.name,
        token: tokenFormatado,
        currentYear: now.getFullYear(),
      }),
    });

    if (!sender) {
      return new NextResponse(JSON.stringify(sender), {
        status: 401,
        statusText: "Erro ao enviar e-mail",
      });
    }

    return new NextResponse(null, {
      status: 201,
      statusText: "Enviado código para seu e-mail",
    });
  } catch (error) {
    return Response.json({ message: error });
  }
}
