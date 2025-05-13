"use client";

import { addToast, Button, Input, Link, useDisclosure } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { getSession, signIn } from "next-auth/react";
import { useForm } from "react-hook-form";

import { LoginFormProps, loginSchema } from "@/zod-schemas/loginSchema";

import ModalSendMail from "./modal-send-mail";

export function LoginAuth() {
  const {
    isOpen: isOpenEmail,
    onOpen: onOpenEmail,
    onOpenChange: onOpenChangeEmail,
    onClose: closeEmail,
  } = useDisclosure();

  // Para o formulário de login
  const login = useForm<LoginFormProps>({
    resolver: zodResolver(loginSchema),
  });

  const router = useRouter();

  async function onSubmit(data: LoginFormProps) {
    const res = await signIn<"credentials">("credentials", {
      ...data,
      redirect: false,
    });

    if (!res?.ok) {
      addToast({
        title: "Atenção",
        description: res?.error || "Erro no servidor, contato o suporte!",
        color: "danger",
      });
      return false;
    }
    const session = await getSession();
    const role = Number(session?.user.fl_role);

    if (role === 2) {
      router.push(`/user`);
    } else if ([0, 1].includes(role)) {
      router.push(`/admin`);
    }
  }

  return (
    <>
      <div className="absolute bottom-0 left-0 top-0 h-full w-full overflow-hidden bg-blue-900 bg-gradient-to-b from-gray-900 via-gray-900 to-blue-800 leading-5"></div>
      <div className="relative h-screen items-center justify-center overflow-hidden rounded-3xl bg-transparent shadow-xl sm:flex sm:flex-row">
        <div className="z-10 flex flex-col self-center sm:max-w-4xl lg:px-14 xl:max-w-md">
          <div className="hidden flex-col self-start text-gray-300 lg:flex">
            <h1 className="my-3 text-4xl font-semibold">Bem-Vindo</h1>
            <p className="pr-3 text-white">
              ao sistema de certificado digital. Utilize suas credenciais para
              acessar os serviços e ferramentas disponíveis.
            </p>
          </div>
        </div>
        <div className="z-10 flex justify-center self-center">
          <div className="mx-4 mt-10 w-96 rounded-3xl bg-white p-6 shadow-lg shadow-gray-600 sm:mx-auto sm:mt-0 sm:p-10">
            <div className="mp-7">
              <h3 className="pb-8 text-2xl font-semibold text-gray-800">
                Login
              </h3>
            </div>
            <form onSubmit={login.handleSubmit(onSubmit)}>
              <div className="space-y-6">
                <Input
                  className="mb-9 mt-1 w-full text-sm"
                  classNames={{
                    label: "font-bold",
                  }}
                  label="E-mail ou usuário"
                  labelPlacement="outside"
                  placeholder="name@example.com"
                  {...login.register("emailOrUser")}
                  isInvalid={!!login.formState.errors.emailOrUser}
                  errorMessage={login.formState.errors.emailOrUser?.message}
                />
                <div className="relative">
                  <Input
                    className="mb-5 mt-1 w-full text-sm"
                    classNames={{
                      label: "font-bold",
                    }}
                    label="Senha"
                    labelPlacement="outside"
                    placeholder="******"
                    type="password"
                    maxLength={10}
                    {...login.register("password")}
                    isInvalid={!!login.formState.errors.password}
                    errorMessage={login.formState.errors.password?.message}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="ml-auto text-sm">
                    <Link
                      className="cursor-pointer text-sm text-blue-600 hover:text-blue-500"
                      onPress={onOpenEmail}
                    >
                      Esqueceu a senha?
                    </Link>
                  </div>
                </div>
                <div>
                  <Button
                    type="submit"
                    isDisabled={login.formState.isSubmitting}
                    isLoading={login.formState.isSubmitting}
                    className="w-full rounded-lg bg-blue-800 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-sky-600 hover:shadow-md"
                    endContent={
                      <ArrowRight
                        className="inline-block transform transition-transform group-hover:translate-x-1"
                        size={24}
                      />
                    }
                  >
                    Entrar
                  </Button>
                </div>

                <div className="flex w-full justify-center gap-5"></div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <footer className="absolute bottom-0 left-0 z-30 w-full bg-transparent">
        <div className="container mx-auto flex items-center justify-between p-5">
          <div className="mr-auto flex">
            <a
              href="https://codepen.io/uidesignhub"
              target="_blank"
              title="codepen aji"
              className="text-center text-gray-700 focus:outline-none"
            ></a>
          </div>
        </div>
      </footer>

      <svg
        className="absolute bottom-0 left-0 hidden 2xl:block"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 248"
      >
        <path
          fill="#fff"
          fillOpacity="1"
          d="M0,0L40,42.7C80,85,160,171,240,197.3C320,224,400,192,480,154.7C560,117,640,75,720,74.7C800,75,880,117,960,154.7C1040,192,1120,224,1200,213.3C1280,203,1360,149,1400,122.7L1440,96L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
        ></path>
      </svg>

      <ModalSendMail
        params={{
          open: isOpenEmail,
          change: onOpenChangeEmail,
          onClose: closeEmail,
        }}
      />
    </>
  );
}
