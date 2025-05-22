import {
  PaymentMethod,
  PaymentStatus,
  SplitReceiverType,
} from "@prisma/client";

import db from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

interface WhereClause {
  createdAt?: {
    gte: Date;
    lt: Date;
  };
  type: SplitReceiverType;
}

interface LastTransactionsProps {
  id: number;
  name: string;
  status: PaymentStatus;
  paymentMethod: PaymentMethod;
  totalAmount: number;
  createdAt: Date;
}

export const getDashboard = async (month?: string) => {
  const session = await getCurrentUser();
  const year = new Date().getFullYear();

  if (!session) {
    throw new Error("Unauthorized");
  }

  const where: WhereClause = {
    type: "COMPANY",
  };

  // Verifica se o mês é válido e aplica a lógica de data
  if (month && /^\d{2}$/.test(month)) {
    where.createdAt = {
      gte: new Date(`${year}-${month}-01`),
      lt: new Date(`${year}-${month}-31`),
    };
  }

  const totalCustomers = Number(await db.customer.count({}));

  const yearlyNetProfit = Number(
    (
      await db.paymentSplit.aggregate({
        where: {
          createdAt: {
            gte: new Date(`${year}-01-01T00:00:00.000Z`), // Início do ano
            lt: new Date(`${year + 1}-01-01T00:00:00.000Z`), // Início do próximo ano
          },
          type: "COMPANY",
        },
        _sum: { amount: true },
      })
    )?._sum?.amount ?? 0,
  );

  const MonthlyNetProfit = Number(
    (
      await db.paymentSplit.aggregate({
        where,
        _sum: { amount: true },
      })
    )?._sum?.amount ?? 0,
  );

  const monthlyBillingeCNPJ = Number(
    (
      await db.payment.aggregate({
        where: {
          createdAt: {
            gte: new Date(`${year}-${month}-01`),
            lt: new Date(`${year}-${month}-31`),
          },
          status: "paid",
          service: {
            name: "eCNPJ",
          },
        },
        _sum: { totalAmount: true },
      })
    )?._sum?.totalAmount ?? 0,
  );

  const monthlyBillingeCPF = Number(
    (
      await db.payment.aggregate({
        where: {
          createdAt: {
            gte: new Date(`${year}-${month}-01`),
            lt: new Date(`${year}-${month}-31`),
          },
          status: "paid",
          service: {
            name: "eCPF",
          },
        },
        _sum: { totalAmount: true },
      })
    )?._sum?.totalAmount ?? 0,
  );

  const monthlyOutputs = Number(
    (
      await db.paymentSplit.aggregate({
        where: {
          createdAt: {
            gte: new Date(`${year}-${month}-01`),
            lt: new Date(`${year}-${month}-31`),
          },
          type: {
            not: "COMPANY",
          },
        },
        _sum: { amount: true },
      })
    )?._sum?.amount ?? 0,
  );

  const lastTransactions = await db.$queryRaw<LastTransactionsProps[]>` 
    SELECT p.id , c."name" , p.status , p."paymentMethod" , p."totalAmount", p."createdAt" 
      FROM "Payment" p
        INNER JOIN "Customer" c ON p."customerId" = c.id
        WHERE p.status = 'paid'

    UNION
    
    SELECT ps.id,  
        CASE 
          WHEN ps."type" = 'THIRD_PARTY' THEN 'Terceiro'
          WHEN ps."type" = 'AFFILIATE' THEN 'Afiliado'
          ELSE ps."type"::text
        END as name,
        'transfer' as status, 'pix' as paymentMethod, ps.amount as totalAmount,  ps."createdAt" 
      FROM "PaymentSplit" ps
        WHERE ps.type IN ('THIRD_PARTY', 'AFFILIATE')
    
    ORDER BY "createdAt" DESC
    LIMIT 10;
  `;

  const [totalReceived, totalSplit] = await Promise.all([
    db.payment
      .aggregate({
        where: { status: "paid" },
        _sum: { totalAmount: true },
      })
      .then((res) => Number(res._sum?.totalAmount ?? 0)),

    db.paymentSplit
      .aggregate({
        where: {
          type: {
            in: ["THIRD_PARTY", "AFFILIATE"],
          },
        },
        _sum: { amount: true },
      })
      .then((res) => Number(res._sum?.amount ?? 0)),
  ]);

  const currentBalance = totalReceived - totalSplit;

  const monthlyNetProfit = Number(
    (
      await db.paymentSplit.aggregate({
        where: {
          createdAt: {
            gte: new Date(`${year}-${month}-01`),
            lt: new Date(`${year}-${month}-31`),
          },
          type: "COMPANY",
        },
        _sum: { amount: true },
      })
    )?._sum?.amount ?? 0,
  );

  return {
    totalCustomers,
    yearlyNetProfit,
    MonthlyNetProfit,
    monthlyBillingeCNPJ,
    monthlyBillingeCPF,
    lastTransactions,
    monthlyOutputs,
    currentBalance,
    monthlyNetProfit
  };
};
