import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PaymentStatus } from "@prisma/client";
import bcrypt from "bcrypt";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import db from "./prisma";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        emailOrUser: { label: "Email ou User", type: "text" },
        password: { label: "Senha", type: "password" },
      },

      async authorize(credentials): Promise<{
        id: string;
        email?: string;
        user?: string;
        password: string;
        fl_role: number;
      } | null> {
        if (!credentials?.emailOrUser || !credentials?.password)
          throw new Error("Dados de Login necessarios");

        let foundUser;
        let fl_role;
        let user;
        if (credentials.emailOrUser.includes("@")) {
          foundUser = await db.customer.findUnique({
            where: { email: credentials.emailOrUser },
            include: {
              payments: true,
            },
          });

          if (!foundUser) throw new Error("E-mail não cadastrado!");

          // Se chegou até aqui, significa que há pelo menos um pagamento.
          // Vamos pegar o status do pagamento mais recente.
          const latestPayment = foundUser.payments[0];
          const status = latestPayment?.status;

          if (!["paid"].includes(status as PaymentStatus)) {
            throw new Error(
              "Pagamento necessário. Por favor, realize o pagamento do seu pacote!",
            );
          }

          fl_role = 2;
        } else {
          // Tentativa de login como administrador
          foundUser = await db.admin.findFirst({
            where: { user: credentials.emailOrUser },
          });

          if (!foundUser) throw new Error("Usuário não cadastrado!");
          fl_role = foundUser.fl_role;
          user = foundUser.user;
        }

        const matchPassword = await bcrypt.compare(
          credentials.password,
          foundUser.password,
        );

        if (!matchPassword) {
          throw new Error("Senha incorreta!");
        }

        return {
          ...foundUser,
          fl_role,
          user,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60, // 3600 segundos = 1 hora
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
  pages: {
    error: "/login",
    signOut: "/",
  },
  callbacks: {
    jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
        token.id = user?.id;
        if ("fl_role" in user) {
          token.fl_role = user.fl_role;
        }
        if ("user" in user) {
          token.user = user.user;
        }
      }

      return token;
    },
    session({ session, token }) {
      session.user.id = String(token.id);
      session.user.fl_role = Number(token.fl_role);

      // Opção 1: Usar operador de coalescência nula
      session.user.user = String(token.user ?? "");

      // OU Opção 2: Verificar se existe antes
      if (token.user) {
        session.user.user = String(token.user);
      }

      // OU Opção 3: Verificar e atribuir um valor padrão se não existir
      session.user.user = token.user ? String(token.user) : "";

      return session;
    },
  },
};
