import "../globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Toast from "@/components/toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Meu.CD - Login",
  description:
    "Meu Certificado Digital: Obtenha seu Certificado Digital sem sair de casa! Oferecemos serviços completos para empresas e pessoas físicas, garantindo  segurança e praticidade nas suas transações. Simplifique sua vida digital com o Meu Certificado Digital!",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <div className="flex h-screen flex-col overflow-hidden">
          <Navbar />
          <main className="flex-grow overflow-hidden">{children}</main>
          <Toast />
          <Footer />
        </div>
      </body>
    </html>
  );
}
