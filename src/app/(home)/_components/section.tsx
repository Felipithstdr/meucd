"use client";

import { Button } from "@heroui/button";
import { useDisclosure } from "@heroui/react";
import AOS from "aos";
import { Building2, User } from "lucide-react";
import { useEffect, useState } from "react";

import ModalAuthChoice from "./modal-auth-choice";

const Section = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [serviceId, setServiceId] = useState(0);
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");

  const handleOpen = (
    serviceId: number,
    price: number,
    description: string,
  ) => {
    setServiceId(serviceId);
    setPrice(price);
    setDescription(description);
    onOpen();
  };

  useEffect(() => {
    AOS.init({
      easing: "ease-out-cubic",
      once: false,
      offset: 50,
      mirror: true,
    });
  }, []);

  return (
    <>
      <section id="about" className="bg-white dark:bg-gray-900">
        <div
          className="mx-auto max-w-screen-xl items-center gap-16 px-4 py-8 lg:px-6 lg:py-16"
          data-aos="fade-up"
        >
          <div className="text-center font-light text-gray-500 sm:text-lg dark:text-gray-400">
            <span className="text-blue-700 dark:text-blue-500">Sobre nós</span>
            <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Meu Certificado Digital
            </h2>
            <p className="mb-4">
              Somos uma startup inovadora especializada em conectar você ou sua
              empresa às melhores soluções de certificados digitais no mercado.
              Simplificamos o processo: você compra conosco de forma fácil e
              segura, e cuidamos do seu encaminhamento para uma certificadora
              parceira reconhecida.
            </p>
            <p>Deixe sua segurança digital com quem entende do futuro!</p>
          </div>
        </div>
      </section>

      <section
        id="services"
        className="bg-gray-200 dark:bg-gray-800"
        data-aos="fade-up"
      >
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-16 lg:px-6">
          <span className="flex justify-center text-blue-700 dark:text-blue-500">
            Nossos serviços
          </span>
          <div className="mx-auto mb-8 max-w-screen-md text-center lg:mb-16">
            <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Seu certificado digital está a um clique
            </h2>
            <p className="text-gray-500 sm:text-xl dark:text-gray-400">
              No{" "}
              <span className="font-semibold text-blue-700 dark:text-blue-500">
                Meu Certificado Digital
              </span>
              , simplificamos todo o processo para você conquistar seu
              certificado digital. Após a compra, orientamos cada passo e
              realizamos o encaminhamento direto para uma certificadora parceira
              e confiável, tudo com transparência e agilidade.
            </p>
          </div>
          <div className="flex flex-col space-y-3 sm:space-y-0 md:flex-row md:items-center md:justify-center">
            <div
              className="mx-auto block max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow-md hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-700 dark:hover:bg-gray-700"
              data-aos="fade-right"
              data-aos-offset="200"
            >
              <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 lg:h-12 lg:w-12 dark:bg-blue-600">
                <User color="white" />
              </div>
              <h3 className="mb-2 text-center text-xl font-bold text-black dark:text-white">
                Pessoa Física
              </h3>
              <p className="text-center text-gray-500 dark:text-gray-400">
                O certificado digital para pessoa física (e-CPF) garante
                autenticidade e segurança para assinar documentos eletrônicos,
                acessar sistemas do governo e facilitar rotinas contábeis, como
                declaração de imposto de renda e serviços junto à Receita
                Federal.
              </p>
            </div>

            <div
              className="mx-auto block max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow-md hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-700 dark:hover:bg-gray-700"
              data-aos="fade-left"
              data-aos-offset="300"
            >
              <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 lg:h-12 lg:w-12 dark:bg-blue-600">
                <Building2 color="white" />
              </div>
              <h3 className="mb-2 text-center text-xl font-bold text-black dark:text-white">
                Pessoa Jurídica
              </h3>
              <p className="text-center text-gray-500 dark:text-gray-400">
                O certificado digital para pessoa jurídica (e-CNPJ) é
                fundamental para empresas realizarem assinaturas eletrônicas,
                emitirem notas fiscais, atenderem às obrigações fiscais e
                facilitarem suas rotinas contábeis com total segurança nas
                transações digitais.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="promotion"
        data-aos="fade-up"
        className="bg-white dark:bg-gray-900"
      >
        <div
          className="mx-auto max-w-screen-xl items-center gap-16 px-4 py-8 lg:px-6 lg:py-16"
          data-aos="fade-up"
        >
          <div className="text-center font-light text-gray-500 sm:text-lg dark:text-gray-400">
            <span className="text-blue-700 dark:text-blue-500">Promoções</span>
            <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Descontos em Certificados Digitais
            </h2>
            <p className="mt-6 text-center text-gray-500 sm:text-left sm:text-xl dark:text-gray-400">
              Aproveite descontos exclusivos ao adquirir mais de um certificado
              digital! Confira nossas condições especiais para compras em
              quantidade.
            </p>
            <p className="mt-4 text-center text-base font-semibold text-gray-500 sm:text-left dark:text-gray-400">
              Promoção válida apenas para compras realizadas em um único pedido.
              Os descontos não se aplicam a compras fracionadas.
            </p>
            <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mx-auto lg:max-w-4xl lg:grid-cols-3">
              {/* Cupom 1 */}
              <div
                className="relative rounded-lg bg-gradient-to-br from-sky-500 to-sky-700 px-4 py-4 text-center text-white shadow-md"
                data-aos="flip-down"
                data-aos-offset="200"
              >
                <span className="text-2xl font-bold text-white">10% OFF</span>
                <p className="text-md mt-2 text-center text-white">
                  Na compra de 2 a 3 certificados
                </p>
                <p className="mt-2 text-sm">*Válido para compras únicas</p>

                <div className="absolute left-4 top-1/2 -ml-6 h-4 w-4 -translate-y-1/2 transform rounded-full bg-gray-700 dark:bg-white"></div>
                <div className="absolute right-4 top-1/2 -mr-6 h-4 w-4 -translate-y-1/2 transform rounded-full bg-gray-700 dark:bg-white"></div>
              </div>

              {/* Cupom 2 */}
              <div
                className="relative rounded-lg bg-gradient-to-br from-sky-500 to-sky-700 px-4 py-4 text-center text-white shadow-md"
                data-aos="flip-down"
                data-aos-offset="250"
              >
                <span className="text-2xl font-bold text-white">15% OFF</span>
                <p className="text-md mt-2 text-center text-white">
                  Na compra de 4 a 7 certificados
                </p>
                <p className="mt-2 text-sm">*Válido para compras únicas</p>

                <div className="absolute left-4 top-1/2 -ml-6 h-4 w-4 -translate-y-1/2 transform rounded-full bg-gray-700 dark:bg-white"></div>
                <div className="absolute right-4 top-1/2 -mr-6 h-4 w-4 -translate-y-1/2 transform rounded-full bg-gray-700 dark:bg-white"></div>
              </div>

              {/* Cupom 3 */}
              <div
                className="relative rounded-lg bg-gradient-to-br from-sky-500 to-sky-700 px-4 py-4 text-center text-white shadow-md"
                data-aos="flip-down"
                data-aos-offset="300"
              >
                <span className="text-2xl font-bold text-white">25% OFF</span>
                <p className="text-md mt-2 text-center text-white">
                  Na compra de 8 ou mais certificados
                </p>
                <p className="mt-2 text-sm">*Válido para compras únicas</p>

                <div className="absolute left-4 top-1/2 -ml-6 h-4 w-4 -translate-y-1/2 transform rounded-full bg-gray-700 dark:bg-white"></div>
                <div className="absolute right-4 top-1/2 -mr-6 h-4 w-4 -translate-y-1/2 transform rounded-full bg-gray-700 dark:bg-white"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Certificates --> */}
      <section
        id="certificates"
        data-aos="fade-up"
        className="bg-gray-200 dark:bg-gray-800"
      >
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-16 lg:px-6">
          <div className="mx-auto mb-8 max-w-screen-md text-center lg:mb-12">
            <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Escolha o seu Certificado Digital
            </h2>
          </div>
          <div className="flex flex-col items-center justify-center space-y-8 lg:flex-row lg:space-y-0">
            {/* <!-- Pricing Card --> */}
            <div
              className="mx-auto flex max-w-sm flex-col rounded-lg border border-gray-100 bg-white p-6 text-center text-gray-900 shadow-md xl:p-8 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              data-aos="fade-right"
              data-aos-delay="300"
            >
              <h3 className="mb-4 text-2xl font-semibold">eCPF</h3>
              <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                Para quem precisa de assinatura digital e acessos com segurança.
              </p>
              <div className="my-8 flex items-baseline justify-center">
                <span className="mr-2 text-5xl font-extrabold">R$ 129,90</span>
              </div>
              <Button
                size="sm"
                className="dark:hover:blue-700 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600"
                onPress={() => handleOpen(1, 129.9, "eCPF")}
              >
                Comprar
              </Button>
            </div>
            {/* <!-- Pricing Card --> */}
            <div
              className="mx-auto flex max-w-sm flex-col rounded-lg border border-gray-100 bg-white p-6 text-center text-gray-900 shadow-md xl:p-8 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              data-aos="fade-left"
              data-aos-delay="400"
            >
              <h3 className="mb-4 text-2xl font-semibold">eCNPJ</h3>
              <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                Para sua empresa emitir notas fiscais e cumprir as obrigações
                fiscais.
              </p>
              <div className="my-8 flex items-baseline justify-center">
                <span className="mr-2 text-5xl font-extrabold">R$ 189,90</span>
              </div>
              <Button
                size="sm"
                className="dark:hover:blue-700 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600"
                onPress={() => handleOpen(2, 189.9, "eCNPJ")}
              >
                Comprar
              </Button>
            </div>
          </div>
        </div>
        <ModalAuthChoice
          params={{
            open: isOpen,
            change: onOpenChange,
            onClose: onClose,
            serviceId: serviceId,
            price: price,
            description: description,
          }}
        />
      </section>
    </>
  );
};

export default Section;
