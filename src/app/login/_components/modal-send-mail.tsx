"use client";

import { addToast, Input, useDisclosure } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Modal from "@/components/modal";
import ModalOTP from "@/components/modal-otp";

interface PropsModal {
  params: {
    open: boolean;
    change: (isOpen: boolean) => void;
    onClose: () => void;
  };
}

const emailSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Campo obrigatório!" })
    .email({ message: "E-mail inválido" }),
});

type MailFormProps = z.infer<typeof emailSchema>;

const ModalSendMail = ({ params }: PropsModal) => {
  const { open, change, onClose } = params;

  const {
    isOpen: isOpenOTP,
    onOpen: onOpenOTP,
    onOpenChange: onOpenChangeOTP,
    onClose: closeOTP,
  } = useDisclosure();

  // Para o formulário de envio de e-mail
  const formEmail = useForm<MailFormProps>({
    resolver: zodResolver(emailSchema),
  });

  async function handleSendMail(data: MailFormProps) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST_URL}/api/email/reset/sendMail`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN_API}`,
        },
        body: JSON.stringify(data),
      },
    );

    if (!res.ok) {
      addToast({
        title: "Atenção",
        description: res.statusText,
        color: "warning",
      });
      return false;
    }

    addToast({
      title: "Sucesso!",
      description: res.statusText,
      color: "success",
    });
    onClose();
    onOpenOTP();
  }

  return (
    <>
      <Modal
        params={{
          change: change,
          size: "xl",
          title: "Enviar e-mail",
          open: open,
          body: (
            <div className="-mx-3">
              <Input
                size="sm"
                autoFocus
                type="email"
                {...formEmail.register("email")}
                label="Email"
                placeholder="example@example.com"
                variant="bordered"
                disabled={formEmail.formState.isSubmitting}
                isInvalid={!!formEmail.formState.errors.email}
                errorMessage={formEmail.formState.errors.email?.message}
              />
            </div>
          ),
          extraButtons: [
            {
              label: formEmail.formState.isSubmitting ? "Enviando" : "Enviar",
              isLoading: formEmail.formState.isSubmitting,
              disabled: formEmail.formState.isSubmitting,
              color: "success",
              variant: "solid",
              onPress: () => formEmail.handleSubmit(handleSendMail)(),
            },
          ],
        }}
      />

      <ModalOTP
        params={{
          open: isOpenOTP,
          change: onOpenChangeOTP,
          onClose: closeOTP,
          email: formEmail.getValues("email"),
        }}
      />
    </>
  );
};

export default ModalSendMail;
