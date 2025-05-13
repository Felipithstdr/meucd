"use client";

import {
  addToast,
  Button,
  Card,
  CardBody,
  Input,
  useDisclosure,
} from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Customer } from "@prisma/client";
import { KeyRound, Save } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useHookFormMask } from "use-mask-input";
import { z } from "zod";

import { updateCustomer } from "@/action/customer/update";
import ModalOTP from "@/components/modal-otp";
import { formatCpf } from "@/helpers/mask";

interface ProfileProps {
  customer: Omit<Customer, "password" | "token" | "agreedToTerms">;
}

const formCustomerSchema = z.object({
  name: z.string().min(1, "Campo obrigatório!"),
  email: z.string().min(1, "Campo obrigatório!").email("E-mail inválido"),
  cellPhone: z
    .string()
    .min(1, { message: "Campo obrigatório!" })
    .regex(/^\(\d{2}\) \d{5}-\d{4}$/, { message: "Celular inválido" }),
});

type FormCustomerProps = z.infer<typeof formCustomerSchema>;

const Profile = ({ customer }: ProfileProps) => {
  const { data: user } = useSession();
  const [loadingEmail, setLoadingEmail] = useState(false);

  const {
    isOpen: openOTP,
    onOpen: onOpenOTP,
    onOpenChange: changeOTP,
    onClose: closeOTP,
  } = useDisclosure();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormCustomerProps>({
    resolver: zodResolver(formCustomerSchema),
  });

  // Assista o valor do campo para garantir que está atualizado
  const registerWithMask = useHookFormMask(register);

  if (!user) return null;

  const onSubmit = async (data: FormCustomerProps) => {
    try {
      const res = await updateCustomer(data);

      if (!res.success) {
        addToast({
          title: "Atenção",
          description: res.error,
          color: "danger",
        });
        return;
      }
      addToast({
        description: res.success,
        color: "success",
      });
    } catch (error) {
      addToast({
        title: "Atenção",
        description: "Erro ao atualizar cliente:" + error,
        color: "danger",
      });
    }
  };

  async function handleSendMail(email: string) {
    setLoadingEmail(true);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST_URL}/api/email/reset/sendMail`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN_API}`,
        },
        body: JSON.stringify({ email }),
      },
    );

    if (!res.ok) {
      addToast({
        title: "Atenção",
        description: res.statusText,
        color: "warning",
      });
      setLoadingEmail(false);
      return false;
    }

    addToast({
      title: "Sucesso!",
      description: res.statusText,
      color: "success",
    });
    setLoadingEmail(false);
    onOpenOTP();
  }

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-center">
        <div className="w-full max-w-4xl">
          <Card
            isBlurred
            className="mx-auto mt-12 max-w-3xl p-8 px-12 sm:mt-20"
            shadow="md"
          >
            <CardBody>
              <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset>
                  <legend className="mb-4 dark:text-black">
                    Dados do Cliente
                  </legend>
                  <div className="-mx-3 mb-6 md:flex">
                    <div className="mb-6 px-3 md:mb-0 md:w-1/2">
                      <Input
                        className="w-full"
                        label="Nome"
                        size="sm"
                        defaultValue={customer.name}
                        {...register("name")}
                        isRequired
                        isInvalid={!!errors.name}
                        errorMessage={errors.name?.message}
                      />
                    </div>
                    <div className="px-3 md:w-1/2">
                      <Input
                        className="w-full"
                        label="E-mail"
                        size="sm"
                        placeholder="example@email.com"
                        defaultValue={customer.email}
                        {...register("email")}
                        isRequired
                        isInvalid={!!errors.email}
                        errorMessage={errors.email?.message}
                      />
                    </div>
                  </div>
                  <div className="-mx-3 mb-6 md:flex">
                    <div className="mb-6 px-3 md:mb-0 md:w-1/2">
                      <Input
                        className="w-full"
                        label="CPF"
                        size="sm"
                        defaultValue={formatCpf(customer.cpf)}
                        isRequired
                        isDisabled
                      />
                    </div>
                    <div className="px-3 md:w-1/2">
                      <Input
                        className="w-full"
                        label="Celular"
                        size="sm"
                        placeholder="(DD) 99999-9999"
                        {...registerWithMask("cellPhone", "(99) 99999-9999")}
                        defaultValue={customer.cellPhone}
                        isRequired
                        isInvalid={!!errors.cellPhone}
                        errorMessage={errors.cellPhone?.message}
                      />
                    </div>
                  </div>
                  <div className="-mx-3 mb-6 md:flex">
                    <div className="px-3 md:w-1/2">
                      <div className="flex flex-row">
                        <div className="relative mb-3 w-full lg:w-6/12">
                          <Button
                            className="bg-blue-700 text-white hover:bg-blue-800"
                            startContent={<KeyRound />}
                            onPress={() => handleSendMail(customer.email)}
                            isLoading={loadingEmail}
                            isDisabled={loadingEmail}
                          >
                            Resetar Senha
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </fieldset>
                <div className="flex justify-end">
                  <Button
                    color="success"
                    type="submit"
                    isLoading={isSubmitting}
                    isDisabled={isSubmitting}
                    startContent={<Save />}
                  >
                    Salvar
                  </Button>
                </div>
              </form>
            </CardBody>
          </Card>

          <ModalOTP
            params={{
              open: openOTP,
              change: changeOTP,
              onClose: closeOTP,
              email: customer.email,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
