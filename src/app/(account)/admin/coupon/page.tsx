import db from "@/lib/prisma";

import Coupon from "./_components/coupon";

const CouponPage = async () => {
  const coupon = await db.coupon.findMany({
    omit: {
      updatedAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return <Coupon coupon={coupon} />;
};

export default CouponPage;
