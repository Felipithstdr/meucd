import { NextRequest, NextResponse } from "next/server";

import db from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    // Use req.nextUrl para pegar params da query string
    const customerId = req.nextUrl.searchParams.get("customerId");

    if (!customerId) {
      return NextResponse.json(
        { message: "customerId não informado" },
        { status: 400 },
      );
    }

    const customerCertificates = await db.digitalCertificate.findMany({
      where: { customerId },
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

    return Response.json(customerCertificates);
  } catch (error) {
    return NextResponse.json(
      { message: "Error", error },
      {
        status: 500,
      },
    );
  }
}
