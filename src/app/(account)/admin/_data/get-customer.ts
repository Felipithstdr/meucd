import db from "@/lib/prisma";

export const getCustomer = async () => {
  const users = await db.payment.findMany({
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
    users,
  };
};
