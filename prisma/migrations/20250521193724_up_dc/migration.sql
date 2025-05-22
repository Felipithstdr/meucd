/*
  Warnings:

  - A unique constraint covering the columns `[ecpf]` on the table `DigitalCertificate` will be added. If there are existing duplicate values, this will fail.

*/

-- AlterTable: renomeando cnpj para ecnpj
ALTER TABLE "DigitalCertificate"
RENAME COLUMN "cnpj" TO "ecnpj";

-- AlterTable
ALTER TABLE "DigitalCertificate" ADD COLUMN     "ecpf" TEXT,
ADD COLUMN     "issueCode" TEXT,
ADD COLUMN     "link" TEXT,
ADD COLUMN     "protocol" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "DigitalCertificate_ecpf_key" ON "DigitalCertificate"("ecpf");
CREATE UNIQUE INDEX "DigitalCertificate_ecnpj_key" ON "DigitalCertificate"("ecnpj");
