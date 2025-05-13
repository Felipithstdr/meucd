import { z } from "zod";

export const resetSchema = z
  .object({
    password: z
      .string()
      .min(1, "Campo obrigatório!")
      .max(6, "Senha deve conter 6 caracteres"),
    confirmPassword: z
      .string()
      .min(1, "Campo obrigatório!")
      .max(6, "Senha deve conter 6 caracteres"),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Senhas diferentes",
      path: ["confirmPassword"],
    },
  );

export type ResetFormProps = z.infer<typeof resetSchema>;
