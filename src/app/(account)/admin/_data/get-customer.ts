import db from "@/lib/prisma";

export const getCustomer = async () => {
  const users = await db.customer.findMany({
    omit:{
      password: true,
      token: true,
      agreedToTerms: true
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return {
    users,
  };
};
