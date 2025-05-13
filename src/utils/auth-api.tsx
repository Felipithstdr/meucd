export type AuthResult = {
  isAuthenticated: boolean;
  response?: Response;
};

export async function verifyBearerToken(req: Request): Promise<AuthResult> {
  const authHeader = req.headers.get("authorization");
  const expectedToken = process.env.NEXT_PUBLIC_TOKEN_API;

  // Verifica se o header existe e está no formato correto
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return {
      isAuthenticated: false,
      response: new Response(
        JSON.stringify({ error: "Token de autenticação ausente ou inválido" }),
        { status: 401, headers: { "Content-Type": "application/json" } },
      ),
    };
  }

  // Extrai o token do header (remove o prefixo "Bearer ")
  const token = authHeader.split(" ")[1];

  // Verifica se o token é válido
  if (token !== expectedToken) {
    return {
      isAuthenticated: false,
      response: new Response(
        JSON.stringify({ error: "Token de autenticação inválido" }),
        { status: 403, headers: { "Content-Type": "application/json" } },
      ),
    };
  }

  // Se chegou aqui, a autenticação foi bem-sucedida
  return { isAuthenticated: true };
}
