"use client";

import { addToast, Checkbox, Input, Select, SelectItem } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { DiscountType } from "@prisma/client";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { createCoupon } from "@/action/coupon/insert";
import Modal from "@/components/modal";

import { COUPON_TYPE_OPTIONS } from "../../_constants/coupons";

interface PropsModal {
  params: {
    open: boolean;
    change: (isOpen: boolean) => void;
    onClose: () => void;
  };
}

const couponSchema = z.object({
  code: z.string().min(1, { message: "Campo obrigatório!" }),
  discountType: z.nativeEnum(DiscountType, {
    errorMap: () => ({ message: "Tipo de desconto inválido" }),
  }),
  discountValue: z.coerce.number().min(1, { message: "Campo obrigatório!" }),
  active: z.boolean(),
  usageLimit: z.string().optional().nullable(),
});

type FormCouponProps = z.input<typeof couponSchema>;

const ModalRegister = ({ params }: PropsModal) => {
  const { open, change, onClose } = params;

  // Para o formulário do cupom
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormCouponProps>({
    resolver: zodResolver(couponSchema),
  });

  const onSubmit = async (data: FormCouponProps) => {
    try {
      const res = await createCoupon(data);
      if (!res.success) {
        addToast({
          title: "Atenção",
          description: res.error,
          color: "danger",
        });
        return;
      }
      addToast({
        title: "Sucesso!",
        description: res.success,
        color: "success",
      });
      onClose();
      reset();
    } catch (error) {
      addToast({
        title: "Atenção",
        description: "Erro ao criar cupom: " + error,
        color: "danger",
      });
    }
  };

  return (
    <Modal
      params={{
        change: change,
        size: "2xl",
        title: "Registrar Cupom",
        open: open,
        body: (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              size="sm"
              label="Código do Cupom"
              {...register("code")}
              isRequired
              isInvalid={!!errors.code}
              errorMessage={errors.code?.message}
            />
            <Select
              size="sm"
              label="Tipo de Desconto"
              {...register("discountType")}
              isRequired
              isInvalid={!!errors.discountType}
              errorMessage={errors.discountType?.message}
            >
              {COUPON_TYPE_OPTIONS.map((option) => (
                <SelectItem key={option.value}>{option.label}</SelectItem>
              ))}
            </Select>
            <Input
              size="sm"
              label="Valor do Desconto"
              {...register("discountValue")}
              isRequired
              isInvalid={!!errors.discountValue}
              errorMessage={errors.discountValue?.message}
            />
            <Input
              size="sm"
              label="Limite de Uso"
              {...register("usageLimit")}
              isInvalid={!!errors.usageLimit}
              errorMessage={errors.usageLimit?.message}
            />
            <Checkbox
              color="success"
              defaultSelected
              radius="md"
              {...register("active")}
            >
              Ativo?
            </Checkbox>
          </div>
        ),
        extraButtons: [
          {
            label: isSubmitting ? "" : "Enviar",
            isLoading: isSubmitting,
            disabled: isSubmitting,
            color: "success",
            variant: "solid",
            onPress: () => handleSubmit(onSubmit)(),
          },
        ],
      }}
    />
  );
};

export default ModalRegister;
