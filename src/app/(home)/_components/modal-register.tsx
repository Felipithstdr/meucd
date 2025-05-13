"use client";

import {
  addToast,
  Button,
  Checkbox,
  Form,
  Input,
  Link,
  Select,
  SelectItem,
  useDisclosure,
} from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdPix } from "react-icons/md";
import { useHookFormMask } from "use-mask-input";
import { z } from "zod";

import Modal from "@/components/modal";
import ModalQrCode from "@/components/modal-qrcode";
import { formatCpf } from "@/helpers/mask";
import { isValidCpf } from "@/helpers/validations";

import ModalPrivacyPolicy from "./modal-privacy-policy";

interface PropsModal {
  params: {
    open: boolean;
    change: (isOpen: boolean) => void;
    onClose: (isOpen: boolean) => void;
    price: number;
    serviceId: number;
    description: string;
  };
}

const formCustomerSchema = z
  .object({
    cpf: z
      .string()
      .min(1, "Campo obrigatório!")
      .min(11, "CPF deve conter 11 números")
      .refine((value) => isValidCpf(value), {
        message: "CPF inválido",
      }),
    name: z.string().min(1, "Campo obrigatório!"),
    email: z.string().min(1, "Campo obrigatório!").email("E-mail inválido"),
    cellPhone: z
      .string()
      .min(1, { message: "Campo obrigatório!" })
      .regex(/^\(\d{2}\) \d{5}-\d{4}$/, { message: "Celular inválido" }),
    quantity: z.coerce.number().optional(),
    agreedToTerms: z.literal(true, {
      errorMap: () => ({
        message: "Você deve aceitar os termos para continuar.",
      }),
    }),
    password: z
      .string()
      .min(6, "Senha deve conter 6 caracteres")
      .max(6, "Senha deve conter no máximo 6 caracteres"),
    confirmPassword: z
      .string()
      .min(6, "Senha deve conter 6 caracteres")
      .max(6, "Senha deve conter no máximo 6 caracteres"),
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

type FormCustomerProps = z.infer<typeof formCustomerSchema>;

const ModalRegister = ({ params }: PropsModal) => {
  const { open, change } = params;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: openPix,
    onOpen: onOpenPix,
    onOpenChange: changePix,
    onClose: closePix,
  } = useDisclosure();
  const [qrcode, setQrcode] = useState("");

  // Para o formulário de cliente
  const {
    register,
    watch,
    reset,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormCustomerProps>({
    resolver: zodResolver(formCustomerSchema),
  });

  // Assista o valor do campo para garantir que está atualizado
  const cpfValue = watch("cpf");
  const registerWithMask = useHookFormMask(register);

  const handleCpfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCpf(event.target.value);

    // Atualiza o valor do CPF no índice específico
    setValue("cpf", formattedValue, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const onSubmit = async (data: FormCustomerProps) => {
    const customData = {
      ...data,
      quantity: data.quantity || 1,
      serviceId: params.serviceId,
      price: params.price,
      description: params.description,
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST_URL}/api/customer-transfeera`,
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN_API}`,
        },
        body: JSON.stringify(customData),
      },
    );

    if (!res.ok) {
      const errorData = await res.json();

      addToast({
        title: "Atenção",
        description: errorData.message || res.statusText,
        color: "warning",
      });
      return;
    }

    reset();
    params.onClose(true);

    // Extrai o URL da resposta
    const { emv_payload } = await res.json();

    setQrcode(emv_payload);
    onOpenPix();
    // window.open(link, "_blank");
    return;
  };

  return (
    <>
      {qrcode && (
        <ModalQrCode
          params={{
            open: openPix,
            change: changePix,
            onClose: closePix,
            emvPayload: qrcode,
          }}
        />
      )}
      <Modal
        params={{
          title: "Registro de dados",
          open: open,
          size: "3xl",
          change: change,
          body: (
            <div className="flex flex-col justify-center">
              <Form onSubmit={handleSubmit(onSubmit)}>
                <div className="w-full max-w-4xl sm:mx-auto">
                  <div className="mb-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Input
                      label="Nome"
                      size="sm"
                      className="w-full"
                      {...register("name")}
                      isRequired
                      isInvalid={!!errors.name}
                      errorMessage={errors.name?.message}
                    />
                    <Input
                      label="CPF"
                      size="sm"
                      className="w-full"
                      {...register("cpf")}
                      isRequired
                      isInvalid={!!errors.cpf}
                      errorMessage={errors.cpf?.message}
                      onChange={handleCpfChange}
                      value={cpfValue}
                    />
                  </div>
                  <div className="mb-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Input
                      label="E-mail"
                      size="sm"
                      className="w-full"
                      placeholder="example@email.com"
                      {...register("email")}
                      isRequired
                      isInvalid={!!errors.email}
                      errorMessage={errors.email?.message}
                    />
                    <Input
                      label="Celular"
                      size="sm"
                      className="w-full"
                      placeholder="(DD) 99999-9999"
                      {...registerWithMask("cellPhone", "(99) 99999-9999")}
                      isRequired
                      isInvalid={!!errors.cellPhone}
                      errorMessage={errors.cellPhone?.message}
                    />
                  </div>
                  <div className="mb-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Input
                      size="sm"
                      type="password"
                      label="Senha"
                      placeholder="6 caracteres"
                      {...register("password")}
                      maxLength={6}
                      minLength={6}
                      isRequired
                      isInvalid={!!errors.password}
                      errorMessage={errors.password?.message}
                    />
                    <Input
                      size="sm"
                      type="password"
                      label="Confirmar senha"
                      {...register("confirmPassword")}
                      maxLength={6}
                      minLength={6}
                      isRequired
                      isInvalid={!!errors.confirmPassword}
                      errorMessage={errors.confirmPassword?.message}
                    />
                  </div>
                  <div className="mb-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Select
                      size="sm"
                      label="Quantidade de CDs"
                      defaultSelectedKeys={["1"]}
                      {...register("quantity")}
                      isInvalid={!!errors.quantity}
                      errorMessage={errors.quantity?.message}
                    >
                      {Array.from({ length: 10 }, (_, i) => i + 1).map(
                        (number) => (
                          <SelectItem key={number.toString()}>
                            {number.toString()}
                          </SelectItem>
                        ),
                      )}
                    </Select>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <div className="flex flex-wrap items-center">
                      <Checkbox
                        radius="full"
                        color="success"
                        {...register("agreedToTerms")}
                      >
                        <span className="text-tiny text-black dark:text-white">
                          Li e concordo com os
                        </span>
                      </Checkbox>
                      <span className="mx-0.5"></span>
                      <Link
                        onPress={onOpen}
                        underline="always"
                        className="text-tiny cursor-pointer text-blue-600 hover:text-blue-500"
                      >
                        Termos de Política e Privacidade
                      </Link>
                    </div>

                    {errors.agreedToTerms && (
                      <div className="px-7 leading-none">
                        <p className="text-[12px] leading-[16px] text-[#F31260]">
                          {errors.agreedToTerms.message}
                        </p>
                      </div>
                    )}

                    <span className="text-tiny flex flex-row text-black dark:text-white">
                      *Pagamento somente em PIX
                      <MdPix size={18} className="ml-1" />
                    </span>
                  </div>
                  <div className="mt-2 flex justify-center">
                    <Button
                      className="w-1/3 rounded-md border border-transparent bg-green-600 text-sm font-bold text-white transition duration-150 ease-in-out hover:bg-emerald-300 focus:outline-none"
                      type="submit"
                      isLoading={isSubmitting}
                      isDisabled={isSubmitting}
                      size="sm"
                    >
                      Registrar
                    </Button>
                  </div>
                </div>
              </Form>
              <ModalPrivacyPolicy
                params={{
                  open: isOpen,
                  change: onOpenChange,
                }}
              />
            </div>
          ),
        }}
      />
    </>
  );
};

export default ModalRegister;
