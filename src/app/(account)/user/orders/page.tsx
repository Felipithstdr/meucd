import db from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

import Orders from "./_components/orders";

const OrderPage = async () => {
  const session = await getCurrentUser();

  if (!session) {
    throw new Error("Unauthorized");
  }

  const orders = await db.payment.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      service: true,
    },
    where: {
      customerId: session.id,
    },
  });

  console.log(orders);

  return <Orders payments={orders} />;
};

export default OrderPage;
