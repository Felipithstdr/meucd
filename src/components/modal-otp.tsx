"use client";

import { addToast, InputOtp, useDisclosure } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { validateOTP } from "@/action/customer/resetPass/otp";
import { OtpFormProps, otpSchema } from "@/zod-schemas/otpSchema";

import Modal from "./modal";
import ModalResetPass from "./modal-reset-pass";

interface PropsModal {
  params: {
    open: boolean;
    change: (isOpen: boolean) => void;
    onClose: () => void;
    email: string;
  };
}

const ModalOTP = ({ params }: PropsModal) => {
  const { open, change, onClose, email } = params;

  const {
    isOpen: isOpenPassword,
    onOpen: onOpenPassword,
    onOpenChange: onOpenChangePassword,
    onClose: closePassword,
  } = useDisclosure();

  // Para o formulário de envio de otp
  const otp = useForm<OtpFormProps>({
    resolver: zodResolver(otpSchema),
  });

  async function handleOTP(otp: OtpFormProps) {
    const data = { email, token: otp.pin.toUpperCase() };

    const res = await validateOTP(data.email, data.token);

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
    onOpenPassword();
  }

  return (
    <>
      <Modal
        params={{
          change,
          open,
          title: "Código enviado para seu e-mail",
          size: "xl",
          body: (
            <div className="flex items-center justify-center">
              <InputOtp
                radius="lg"
                length={6}
                className="uppercase"
                {...otp.register("pin")}
                allowedKeys="^[a-z0-9]*$"
                disabled={otp.formState.isSubmitting}
                isInvalid={!!otp.formState.errors.pin}
                errorMessage={otp.formState.errors.pin?.message}
              />
            </div>
          ),
          extraButtons: [
            {
              label: otp.formState.isSubmitting ? "" : "Enviar",
              isLoading: otp.formState.isSubmitting,
              disabled: otp.formState.isSubmitting,
              color: "success",
              variant: "solid",
              onPress: () => otp.handleSubmit(handleOTP)(),
            },
          ],
        }}
      />

      <ModalResetPass
        params={{
          open: isOpenPassword,
          change: onOpenChangePassword,
          onClose: closePassword,
          email: params.email,
        }}
      />
    </>
  );
};

export default ModalOTP;
