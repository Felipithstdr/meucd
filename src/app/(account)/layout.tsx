import "../globals.css";

import { Geist, Geist_Mono } from "next/font/google";

import { ThemeProvider } from "@/components/theme-providers";
import Toast from "@/components/toast";
import AuthProvider from "@/providers/auth";

import Sidebar from "./_components/sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <title>Meu. CD</title>
      </head>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <div className="flex h-full flex-col overflow-hidden">
              <Sidebar>{children}</Sidebar>
            </div>
            <Toast />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
