import { z } from "zod";

export const otpSchema = z.object({
  pin: z.string().min(6, {
    message: "Sua senha de OTP deve ter 6 caracteres.",
  }),
});

export type OtpFormProps = z.infer<typeof otpSchema>;
