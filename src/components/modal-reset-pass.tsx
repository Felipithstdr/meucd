"use client";

import { addToast, Input } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { resetPassword } from "@/action/customer/resetPass/password";
import { ResetFormProps, resetSchema } from "@/zod-schemas/resetSchema";

import Modal from "./modal";

interface PropsModal {
  params: {
    open: boolean;
    change: (isOpen: boolean) => void;
    onClose: () => void;
    email: string;
  };
}
const ModalResetPass = ({ params }: PropsModal) => {
  const { open, change, onClose, email } = params;

  // Para o formulário de reset de senha
  const resetPass = useForm<ResetFormProps>({
    resolver: zodResolver(resetSchema),
  });

  async function handlePass(data: ResetFormProps) {
    const reset = { email: email, password: data.password };

    const res = await resetPassword(reset);

    if (!res.success) {
      addToast({
        title: "Atenção",
        description: res.error,
        color: "warning",
      });
      return false;
    }
    addToast({
      title: "Sucesso!",
      description: res.success,
      color: "success",
    });
    onClose();
  }

  return (
    <Modal
      params={{
        open,
        title: "Alterar senha",
        size: "xl",
        change,
        body: (
          <div className="-mx-3 flex flex-wrap">
            <div className="mb-2 w-full px-3 md:w-1/2">
              <Input
                id="password"
                placeholder="senha"
                type="password"
                {...resetPass.register("password")}
                maxLength={6}
                disabled={resetPass.formState.isSubmitting}
                isInvalid={!!resetPass.formState.errors.password}
                errorMessage={resetPass.formState.errors.password?.message}
              />
            </div>
            <div className="mb-2 w-full px-3 md:w-1/2">
              <Input
                id="confirmPassword"
                placeholder="Confirmar senha"
                type="password"
                {...resetPass.register("confirmPassword")}
                maxLength={6}
                disabled={resetPass.formState.isSubmitting}
                isInvalid={!!resetPass.formState.errors.confirmPassword}
                errorMessage={
                  resetPass.formState.errors.confirmPassword?.message
                }
              />
            </div>
          </div>
        ),
        extraButtons: [
          {
            label: resetPass.formState.isSubmitting ? "" : "Enviar",
            isLoading: resetPass.formState.isSubmitting,
            disabled: resetPass.formState.isSubmitting,
            color: "success",
            variant: "solid",
            onPress: () => resetPass.handleSubmit(handlePass)(),
          },
        ],
      }}
    />
  );
};

export default ModalResetPass;
