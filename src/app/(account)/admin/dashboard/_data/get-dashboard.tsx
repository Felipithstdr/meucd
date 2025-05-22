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

  const [
    totalCustomersRaw,
    yearlyNetProfitRaw,
    MonthlyNetProfitRaw,
    monthlyBillingeCNPJRaw,
    monthlyBillingeCPFRaw,
    monthlyOutputsRaw,
    lastTransactions,
    totalReceivedRaw,
    totalSplitRaw,
    monthlyNetProfitRaw,
  ] = await Promise.all([
    db.customer.count(),
    db.paymentSplit.aggregate({
      where: {
        createdAt: {
          gte: new Date(`${year}-01-01T00:00:00.000Z`),
          lt: new Date(`${year + 1}-01-01T00:00:00.000Z`),
        },
        type: "COMPANY",
      },
      _sum: { amount: true },
    }),
    db.paymentSplit.aggregate({
      where,
      _sum: { amount: true },
    }),
    db.payment.aggregate({
      where: {
        createdAt: {
          gte: new Date(`${year}-${month}-01`),
          lt: new Date(`${year}-${month}-31`), // Melhor corrigir para o último dia certo
        },
        status: "paid",
        service: { name: "eCNPJ" },
      },
      _sum: { totalAmount: true },
    }),
    db.payment.aggregate({
      where: {
        createdAt: {
          gte: new Date(`${year}-${month}-01`),
          lt: new Date(`${year}-${month}-31`),
        },
        status: "paid",
        service: { name: "eCPF" },
      },
      _sum: { totalAmount: true },
    }),
    db.paymentSplit.aggregate({
      where: {
        createdAt: {
          gte: new Date(`${year}-${month}-01`),
          lt: new Date(`${year}-${month}-31`),
        },
        type: { not: "COMPANY" },
      },
      _sum: { amount: true },
    }),
    db.$queryRaw<LastTransactionsProps[]>`
      SELECT p.id, c."name", p.status, p."paymentMethod", p."totalAmount", p."createdAt" 
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
    `,
    db.payment.aggregate({
      where: { status: "paid" },
      _sum: { totalAmount: true },
    }),
    db.paymentSplit.aggregate({
      where: { type: { in: ["THIRD_PARTY", "AFFILIATE"] } },
      _sum: { amount: true },
    }),
    db.paymentSplit.aggregate({
      where: {
        createdAt: {
          gte: new Date(`${year}-${month}-01`),
          lt: new Date(`${year}-${month}-31`),
        },
        type: "COMPANY",
      },
      _sum: { amount: true },
    }),
  ]);

  const totalCustomers = Number(totalCustomersRaw);
  const yearlyNetProfit = Number(yearlyNetProfitRaw?._sum?.amount ?? 0);
  const MonthlyNetProfit = Number(MonthlyNetProfitRaw?._sum?.amount ?? 0);
  const monthlyBillingeCNPJ = Number(
    monthlyBillingeCNPJRaw?._sum?.totalAmount ?? 0,
  );
  const monthlyBillingeCPF = Number(
    monthlyBillingeCPFRaw?._sum?.totalAmount ?? 0,
  );
  const monthlyOutputs = Number(monthlyOutputsRaw?._sum?.amount ?? 0);
  const totalReceived = Number(totalReceivedRaw?._sum?.totalAmount ?? 0);
  const totalSplit = Number(totalSplitRaw?._sum?.amount ?? 0);
  const monthlyNetProfit = Number(monthlyNetProfitRaw?._sum?.amount ?? 0);
  const currentBalance = totalReceived - totalSplit;

  return {
    totalCustomers,
    yearlyNetProfit,
    MonthlyNetProfit,
    monthlyBillingeCNPJ,
    monthlyBillingeCPF,
    lastTransactions,
    monthlyOutputs,
    currentBalance,
    monthlyNetProfit,
  };
};
