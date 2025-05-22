import { Card, CardBody } from "@heroui/card";
import { PaymentMethod, Prisma } from "@prisma/client";
import { format } from "date-fns";

import Modal from "@/components/modal";
import { formatCellPhone, formatCurrency } from "@/helpers/mask";
import { useFetch } from "@/hooks/use-fetch";

import { PAYMENT_METHOD_LABELS } from "../../_constants/payment";


interface PropsModal {
  params: {
    open: boolean;
    change: (isOpen: boolean) => void;
    paymentCode: string;
  };
}

export type CustomerProps = Prisma.PaymentGetPayload<{
  include: {
    service: true;
    customer: {
      omit: {
        password: true;
        token: true;
        agreedToTerms: true;
      };
    };
  };
}>;

const ModalViewPayment = ({ params }: PropsModal) => {
  const { open, paymentCode, change } = params;

  const { data: payment, isLoading } = useFetch<CustomerProps>(
    `${process.env.NEXT_PUBLIC_HOST_URL}/api/customer?paymentCode=${paymentCode}`,
  );

  if (isLoading || !payment) {
    return null;
  }

  return (
    <Modal
      params={{
        id: paymentCode,
        title: "Detalhes do cliente",
        open: open,
        size: "2xl",
        change: change,
        body: (
          <div className="flex flex-col justify-center">
            <Card
              isBlurred
              className="bg-background/60 dark:bg-default-100/50 max-w-[610px] border-none"
              shadow="sm"
            >
              <CardBody>
                <div className="flex flex-col gap-6">
                  {/* Dados do Cliente */}
                  <fieldset className="border-default-200 dark:border-default-300 rounded-md border p-4">
                    <legend className="text-default-700 px-2 text-base font-bold dark:text-white">
                      Dados do Cliente
                    </legend>
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-col items-start justify-between gap-2 md:flex-row md:items-center">
                        <div className="flex items-center gap-2">
                          <span className="text-foreground/90 font-bold">
                            Nome:
                          </span>
                          <span className="text-foreground/90">
                            {payment.customer.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-foreground/90 font-bold">
                            Celular:
                          </span>
                          <span className="text-foreground/90">
                            {formatCellPhone(payment.customer.cellPhone)}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-start justify-between gap-2 md:flex-row md:items-center">
                        {/* E-mail */}
                        <div className="flex items-center gap-2">
                          <span className="text-foreground/90 font-bold">
                            E-mail:
                          </span>
                          <span className="text-foreground/90">
                            {payment.customer.email}
                          </span>
                        </div>
                        {/* Data de criação */}
                        <div className="flex items-center gap-2">
                          <span className="text-foreground/90 font-bold">
                            Criado em:
                          </span>
                          <span className="text-foreground/90">
                            {format(
                              new Date(payment.customer.createdAt),
                              "dd/MM/yyyy HH:mm",
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </fieldset>

                  {/* Pagamento */}
                  <fieldset className="border-default-200 dark:border-default-300 rounded-md border p-4">
                    <legend className="text-default-700 px-2 text-base font-bold dark:text-white">
                      Pagamento
                    </legend>
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-col items-start justify-between gap-2 md:flex-row md:items-center">
                        <div className="flex items-center gap-2">
                          <span className="text-foreground/90 font-bold">
                          Método de pagamento:
                          </span>
                          <span className="text-foreground/90">
                          {payment.paymentMethod
                            ? PAYMENT_METHOD_LABELS[
                              payment.paymentMethod as PaymentMethod
                              ]
                            : "N/A"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-foreground/90 font-bold">
                            Usou cupom?:
                          </span>
                          <span className="text-foreground/90">
                          {payment.couponId ? "Sim" : "Não"}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-start justify-between gap-2 md:flex-row md:items-center">
                        <div className="flex items-center gap-2">
                          <span className="text-foreground/90 font-bold">
                            Valor pago:
                          </span>
                          <span className="text-foreground/90">
                            {formatCurrency(payment.totalAmount ?? 0)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-foreground/90 font-bold">
                            Quantidade:
                          </span>
                          <span className="text-foreground/90">
                            {payment.quantity ?? 0}
                          </span>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </CardBody>
            </Card>
          </div>
        ),
      }}
    />
  );
};

export default ModalViewPayment;
