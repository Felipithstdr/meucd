import { z } from "zod";

// Função customizada para validar email ou nome de usuário
const isEmailOrUsername = (value: string): boolean => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const usernamePattern = /^[a-zA-Z0-9._]+$/; // Permite pontos e underscores

  return emailPattern.test(value) || usernamePattern.test(value);
};

export const loginSchema = z.object({
  emailOrUser: z
    .string()
    .min(1, "Campo obrigatório!")
    .refine(isEmailOrUsername, {
      message: "Deve ser um e-mail ou nome de usuário válido",
    }),
  password: z
    .string()
    .min(1, "Campo obrigatório!")
    .min(6, "Senha deve conter 6 caracteres"),
});

export type LoginFormProps = z.infer<typeof loginSchema>;
