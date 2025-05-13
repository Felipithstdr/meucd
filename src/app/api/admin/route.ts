import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

import db from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const newAdmin = await req.json();

  const { password, ...data } = newAdmin;

  const hashedPassword = await bcrypt.hash(password, 10);

  const createdAdmin = await db.admin.create({
    data: {
      ...data,
      password: hashedPassword,
    },
  });

  return new NextResponse(JSON.stringify(createdAdmin), {
    status: 201,
    statusText: "Created",
  });
}
