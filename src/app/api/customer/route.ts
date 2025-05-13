import { NextRequest, NextResponse } from "next/server";

import db from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    // Use req.nextUrl para pegar params da query string
    const paymentCode = req.nextUrl.searchParams.get("paymentCode");

    if (!paymentCode) {
      return NextResponse.json(
        { message: "paymentCode não informado" },
        { status: 400 },
      );
    }

    const customer = await db.payment.findUnique({
      where: {
        paymentCode,
      },
      include: {
        customer: {
          omit: {
            password: true,
            token: true,
            agreedToTerms: true,
          },
        },
      },
    });

    return Response.json(customer);
  } catch (error) {
    return NextResponse.json(
      { message: "Error", error },
      {
        status: 500,
      },
    );
  }
}
