"use client";

import {
  addToast,
  Card,
  CardHeader,
  Chip,
  ChipProps,
  Switch,
  useDisclosure,
} from "@heroui/react";
import { Coupon } from "@prisma/client";
import { Check, Infinity, PercentCircle, Plus, Trash, X } from "lucide-react";

import { deleteCoupon } from "@/action/coupon/delete";
import { statusCoupon } from "@/action/coupon/update/status";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/helpers/mask";

import ModalRegister from "./modal-register";

interface CouponProps {
  coupon: Omit<Coupon, "updatedAt">[];
}

const CouponList = ({ coupon }: CouponProps) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const statusColorMap: Record<string, ChipProps["color"]> = {
    active: "success",
    paused: "danger",
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await deleteCoupon(id);

      if (!res.success) {
        addToast({
          title: "Atenção",
          description: res.error,
          color: "danger",
        });
        return;
      }

      addToast({
        title: "Sucesso",
        description: res.success,
        color: "success",
      });
    } catch (error) {
      console.error("Erro ao deletar cupom:", error);
    }
  };

  const handleActionStatus = async (id: number, status: boolean) => {
    try {
      const res = await statusCoupon(id, status);

      if (!res.success) {
        addToast({
          title: "Atenção",
          description: res.error,
          color: "danger",
        });
        return;
      }

      addToast({
        title: "Sucesso",
        description: res.success,
        color: "success",
      });
    } catch (error) {
      console.error("Erro ao deletar cupom:", error);
    }
  };

  return (
    <div className="w-full">
      <div className="mx-auto mt-10 max-w-md sm:mt-16">
        <Card className="bg-white bg-opacity-5">
          <CardHeader className="flex items-center justify-between">
            {/* Esquerda: texto + ícone */}
            <div className="flex items-center gap-2">
              <span className="text-xl text-neutral-600 dark:text-black">
                Cupom de Desconto
              </span>
              <PercentCircle color="black" />
            </div>
            {/* Direita: botão */}
            <Button
              variant="outline"
              size="icon"
              type="button"
              className="cursor-pointer bg-blue-500 hover:bg-blue-300 dark:bg-blue-500 dark:hover:bg-blue-300"
              onClick={onOpen}
            >
              <Plus color="white" />
            </Button>
          </CardHeader>
        </Card>
      </div>
      {coupon && coupon.length > 0 ? (
        coupon.map((item, index) => (
          <ul
            className="mx-auto mt-4 max-w-md overflow-hidden rounded-md bg-white shadow dark:bg-gray-600"
            key={item.id || index}
          >
            <li>
              <div className="px-4 py-5 sm:px-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold leading-6 text-gray-900 dark:text-white">
                    {item.code}
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-100">
                    {item.discountType === "FIXED"
                      ? formatCurrency(item?.discountValue)
                      : `${item.discountValue}%`}
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex flex-col text-sm font-medium text-gray-500 dark:text-gray-100">
                    <div>
                      Status:{" "}
                      <Chip
                        className="text-default-600 gap-1 border-none capitalize"
                        color={
                          statusColorMap[!!item.active ? "active" : "paused"]
                        }
                        size="sm"
                        variant="dot"
                      >
                        {!!item.active ? "Ativo" : "Inativo"}
                      </Chip>
                    </div>
                    <div className="flex items-center gap-1">
                      Limite: {item.usageLimit ?? <Infinity />}
                    </div>
                  </div>
                  <div className="flex items-end justify-between space-x-2">
                    <Switch
                      defaultSelected={item.active}
                      color="success"
                      endContent={<Check />}
                      size="sm"
                      startContent={<X />}
                      onChange={(e) =>
                        handleActionStatus(item.id, e.target.checked)
                      }
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      type="button"
                      className="cursor-pointer bg-red-500 hover:bg-red-300 dark:bg-red-500 dark:hover:bg-red-300"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash color="white" />
                    </Button>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        ))
      ) : (
        <span className="mt-10 flex items-center justify-center text-lg dark:text-black">
          Nenhum cupom cadastrado!
        </span>
      )}

      <ModalRegister
        params={{
          open: isOpen,
          change: onOpenChange,
          onClose: onClose,
        }}
      />
    </div>
  );
};

export default CouponList;
