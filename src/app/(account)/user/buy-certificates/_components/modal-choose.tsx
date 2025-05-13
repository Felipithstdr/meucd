"use client";

import { addToast, Button, Select, SelectItem, Spinner } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdPix } from "react-icons/md";
import { z } from "zod";

import Modal from "@/components/modal";

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

const formCertificateSchema = z.object({
  quantity: z.coerce.number().optional(),
});

type FormCertificateProps = z.infer<typeof formCertificateSchema>;

const ModalChoose = ({ params }: PropsModal) => {
  const { open, change, onClose } = params;
  const { data: user } = useSession();
  const [isLoadingPay, setIsLoadingPay] = useState(false);

  // Para o formulário de cliente
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormCertificateProps>({
    resolver: zodResolver(formCertificateSchema),
  });

  if (!user) {
    return null;
  }

  const onSubmit = async (data: FormCertificateProps) => {
    const combinedData = {
      customerId: user.user.id,
      price: params.price,
      description: params.description,
      serviceId: params.serviceId,
      quantity: data.quantity || 1,
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST_URL}/api/payment-transfeera`,
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN_API}`,
        },
        body: JSON.stringify(combinedData),
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
    onClose(true);
    setIsLoadingPay(true);
    // Extrai o subscriptionId da resposta
    const { invoiceUrl } = await res.json();

    setIsLoadingPay(false);
    window.open(invoiceUrl, "_self");
    return;
  };

  return (
    <>
      {isLoadingPay && (
        <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-white bg-opacity-50 opacity-75">
          <div className="flex flex-col items-center justify-center">
            <Spinner
              classNames={{ label: "text-foreground mt-4" }}
              color="success"
              label="Aguarde..."
              variant="gradient"
            />
          </div>
        </div>
      )}

      <Modal
        params={{
          title: "Escolha a quantidade de CDs",
          open: open,
          size: "3xl",
          change: change,
          body: (
            <div className="flex flex-col justify-center">
              <form onSubmit={handleSubmit(onSubmit)}>
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
                    Comprar
                  </Button>
                </div>
              </form>
            </div>
          ),
        }}
      />
    </>
  );
};

export default ModalChoose;
