"use client";

import { Input } from "@heroui/react";
import { Copy } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

import Modal from "./modal";
import { Button } from "./ui/button";

interface PropsModal {
  params: {
    open: boolean;
    change: (isOpen: boolean) => void;
    onClose: () => void;
    emvPayload: string;
  };
}

const ModalQrCode = ({ params }: PropsModal) => {
  const { open, change, emvPayload } = params;

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(emvPayload).then(() => {
      alert("Pix Copia e Cola copiado para a área de transferência!");
    });
  };

  return (
    <Modal
      params={{
        change,
        open,
        title: "Pagamento com PIX",
        size: "xl",
        isDismissable: false,
        isKeyboard: true,
        body: (
          <div className="flex flex-col items-center">
            <QRCodeSVG value={emvPayload} />
            <p className="mb-4 mt-4 text-center text-gray-700 dark:text-gray-300">
              Pix Copia e Cola:
            </p>
            <div className="flex items-center justify-center">
              <Input
                label="Código Pix"
                size="sm"
                className="w-full"
                defaultValue={emvPayload}
              />
              <Button
                onClick={handleCopyToClipboard}
                className="ml-2 mt-2 cursor-pointer rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                <Copy /> Copiar
              </Button>
            </div>
            <p className="mt-4 text-sm text-gray-700 dark:text-gray-300">
              * Ao finalizar o pagamento nossa assistente Anina, entrará em
              contato para mais informações!
            </p>
          </div>
        ),
      }}
    />
  );
};

export default ModalQrCode;
