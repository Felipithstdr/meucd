"use client";

import Modal from "@/components/modal";

interface PropsModal {
  params: {
    open: boolean;
    change: (isOpen: boolean) => void;
  };
}
const ModalTutorial = ({ params }: PropsModal) => {
  const { open, change } = params;

  return (
    <Modal
      params={{
        title: "Importante",
        open: open,
        size: "2xl",
        change: change,
        body: (
          <div className="space-y-2 text-base text-gray-700 dark:text-gray-300">
            <p>
              Para começar, associe seu certificado digital ao{" "}
              <strong>CPF</strong> ou <strong>CNPJ</strong> conforme a opção
              escolhida na compra.
            </p>
            <p>
              Após o envio dos seus dados, a certificadora será notificada e em
              breve você receberá uma comunicação sobre os próximos passos.
            </p>
            <strong> Certificado: </strong>
            <p>
              Você pode realizar a consulta do status do seu certificado digital
              na seção de
              <strong> Meus Certificados</strong> no menu lateral.
            </p>
            <strong> Pedidos: </strong>
            <p>
              Você pode realizar a consulta do seu pedido na seção de
              <strong> Pedidos</strong> no menu lateral.
            </p>
          </div>
        ),
      }}
    />
  );
};

export default ModalTutorial;
