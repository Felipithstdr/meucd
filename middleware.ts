import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1. **Permite livre acesso na autenticação do NextAuth**
  if (
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/api/check-payment")
  ) {
    return NextResponse.next();
  }

  // 2. **Intercepta rotas de API primeiro**
  if (pathname.startsWith("/api")) {
    const authHeader = req.headers.get("authorization");
    const expectedToken = process.env.TOKEN_API;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Token de autenticação ausente ou inválido" },
        { status: 401 },
      );
    }

    const token = authHeader.split(" ")[1];
    if (token !== expectedToken) {
      return NextResponse.json(
        { error: "Token de autenticação inválido" },
        { status: 403 },
      );
    }

    // Passou no Bearer Token, libera para as rotas de API
    return NextResponse.next();
  }

  // 2. **Lógica de autenticação e roles para rotas de página**
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const fl_role = Number(token.fl_role);
  const url = req.nextUrl.clone();

  // Verifica se o usuário com fl_role 1 está tentando acessar /admin/dashboard
  if (url.pathname === "/admin/dashboard" && fl_role === 0) {
    // Usuários com fl_role 1 não podem acessar /admin/dashboard
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  // Verifica a rota e o fl_role para redirecionar conforme necessário
  if (url.pathname.startsWith("/admin") && fl_role === 2) {
    // Usuários com fl_role 2 não podem acessar /admin
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (url.pathname.startsWith("/user") && [0, 1].includes(fl_role)) {
    // Usuários com fl_role 0 ou 1 não podem acessar /user
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/user/:path*", "/api/:path*"],
};
