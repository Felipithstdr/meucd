"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";

interface ButtonProps {
  label: string;
  onPress?: () => void;
  color?:
    | "danger"
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning";
  variant?:
    | "shadow"
    | "light"
    | "solid"
    | "bordered"
    | "flat"
    | "faded"
    | "ghost";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  isLoading?: boolean;
}

interface Props {
  params: {
    body: React.ReactNode;
    id?: string | number;
    open: boolean;
    change: (isOpen: boolean) => void;
    title: React.ReactNode;
    size:
      | "4xl"
      | "xs"
      | "sm"
      | "md"
      | "lg"
      | "xl"
      | "2xl"
      | "3xl"
      | "5xl"
      | "full"
      | undefined;
    extraButtons?: ButtonProps[];
  };
}

const ModalDynamic = ({ params }: Props) => {
  return (
    <Modal
      isOpen={params.open}
      onOpenChange={params.change}
      placement="center"
      size={params.size}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 font-bold">
              {params.title}
            </ModalHeader>
            <ModalBody key={params.id}>{params.body}</ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Fechar
              </Button>
              {params.extraButtons?.map((button, index) => (
                <Button
                  key={index}
                  color={button.color}
                  variant={button.variant}
                  onPress={button.onPress}
                  type={button.type}
                  disabled={button.disabled}
                  isLoading={button.isLoading}
                >
                  {button.label}
                </Button>
              ))}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalDynamic;
