import db from "@/lib/prisma";

export const getPayment = async () => {
  const payments = await db.payment.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      customer: {
        omit: {
          password: true,
          token: true,
          agreedToTerms: true,
        },
      },
      service: true,
    },
  });

  return {
    payments,
  };
};
