import db from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

import Certificates from "./_components/certificates";

const CertificatePage = async () => {
  const session = await getCurrentUser();

  const certificates = await db.digitalCertificate.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      customerId: session?.id,
    },
  });

  return <Certificates certificates={certificates} />;
};

export default CertificatePage;
