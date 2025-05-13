import db from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

import Profile from "./_components/profile";

const ProfilePage = async () => {
  const session = await getCurrentUser();

  if (!session) {
    throw new Error("Unauthorized");
  }

  const customer = await db.customer.findUnique({
    omit: {
      password: true,
      token: true,
      agreedToTerms: true,
    },
    where: {
      id: session.id,
    },
  });

  if (!customer) {
    throw new Error("Customer not found");
  }

  return <Profile customer={customer} />;
};

export default ProfilePage;
