"use client";

import { addToast, Button, Input } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import { createdCD } from "@/action/digitalCertificate/insert";
import { formatCnpj, formatCpf } from "@/helpers/mask";
import { isValidCnpj, isValidCpf } from "@/helpers/validations";

type AssociatedFormProps = {
  params: {
    serviceId: number;
    quantity: number;
    customerId: string;
  };
};

const getSchema = (serviceId: number, quantity: number) =>
  z.object({
    docs: z
      .array(
        z.object({
          doc: z
            .string()
            .min(1, "Campo obrigatório")
            .transform((val) => {
              const formatted =
                serviceId === 1 ? formatCpf(val) : formatCnpj(val);
              return formatted;
            })
            .refine(
              (val) => {
                return serviceId === 1 ? isValidCpf(val) : isValidCnpj(val);
              },
              { message: serviceId === 1 ? "CPF inválido" : "CNPJ inválido" },
            ),
        }),
      )
      .length(
        quantity,
        `Você precisa preencher ${quantity} ${serviceId === 1 ? "CPFs" : "CNPJs"}`,
      ),
  });

const AssociatedForm = ({ params }: AssociatedFormProps) => {
  const formCertificateSchema = getSchema(params.serviceId, params.quantity);
  type FormCertificateProps = z.infer<typeof formCertificateSchema>;

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormCertificateProps>({
    resolver: zodResolver(formCertificateSchema),
    defaultValues: {
      docs: Array.from({ length: params.quantity }, () => ({ doc: "" })),
    },
  });

  const { fields } = useFieldArray({
    control,
    name: "docs",
  });

  const onSubmit = async (data: FormCertificateProps) => {
    const docsOnly = data.docs.map((item) => item.doc.replace(/\D/g, ""));

    const customerData = {
      customerId: params.customerId,
      serviceId: params.serviceId,
      docs: docsOnly,
    };

    try {
      const res = await createdCD(customerData);

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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <div className="mb-2 grid grid-cols-2 items-center gap-2">
        {fields.map((field, index) => (
          <Input
            key={field.id}
            size="sm"
            placeholder={params.serviceId === 1 ? "CPF" : "CNPJ"}
            {...register(`docs.${index}.doc`)}
            isRequired
            maxLength={params.serviceId === 1 ? 14 : 18}
            value={watch(`docs.${index}.doc`)}
            onChange={(e) => {
              const raw = e.target.value;
              const formatted =
                params.serviceId === 1 ? formatCpf(raw) : formatCnpj(raw);
              setValue(`docs.${index}.doc`, formatted);
            }}
            isInvalid={!!errors.docs?.[index]?.doc}
            errorMessage={errors.docs?.[index]?.doc?.message}
          />
        ))}
      </div>
      <div className="mt-6 flex justify-end">
        <Button
          color="success"
          type="submit"
          size="sm"
          isLoading={isSubmitting}
          isDisabled={isSubmitting}
          startContent={<Send />}
        >
          {!isSubmitting && "Enviar"}
        </Button>
      </div>
    </form>
  );
};

export default AssociatedForm;
