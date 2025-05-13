import db from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

import User from "./_components/user";

const UserPage = async () => {
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
    include: {
      payments: {
        include: {
          service: true,
        },
      },
      digitalCertificates: true,
    },
  });

  if (!customer) {
    throw new Error("Customer not found");
  }

  // --- Cálculo dos slots restantes por tipo de certificado ---
  const grouped = customer.payments.reduce(
    (acc, payment) => {
      const type = payment.serviceId; // 1 = CPF, 2 = CNPJ
      if (!acc[type]) {
        acc[type] = { purchased: 0, filled: 0 };
      }
      acc[type].purchased += payment.quantity;
      return acc;
    },
    {} as Record<number, { purchased: number; filled: number }>,
  );

  customer.digitalCertificates.forEach((cert) => {
    const type = cert.cpf ? 1 : cert.cnpj ? 2 : null;
    if (type && grouped[type]) {
      grouped[type].filled += 1;
    }
  });

  const formDataToRender = Object.entries(grouped)
    .map(([serviceId, data]) => ({
      serviceId: Number(serviceId),
      remaining: data.purchased - data.filled,
    }))
    .filter((item) => item.remaining > 0);

  return <User customer={customer} formDataToRender={formDataToRender} />;
};

export default UserPage;
