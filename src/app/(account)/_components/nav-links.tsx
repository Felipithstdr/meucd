"use client";

import { usePathname } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

export default function NavLinks() {
  const pathname = usePathname(); // Obtém o caminho atual do navegador
  const segments = pathname.split("/").filter(Boolean); // Divide o caminho e remove segmentos vazios

  const translationMap: { [key: string]: string } = {
    user: "usuário",
    profile: "perfil",
    coupin: "Cupom",
    "buy-certificates": "Comprar Certificados",
    orders: "Pedidos",
    certificates: "Certificados",
    payments: "Pagamentos",
  };

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {segments.map((segment, index) => {
          const isLast = index === segments.length - 1;
          const href = "/" + segments.slice(0, index + 1).join("/");

          // tradução do segmento
          const translatedSegment = translationMap[segment] || segment;

          return (
            <BreadcrumbItem key={href}>
              {!isLast ? (
                <BreadcrumbLink href={href} className="capitalize">
                  {decodeURIComponent(translatedSegment)}
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage className="capitalize">
                  {decodeURIComponent(translatedSegment)}
                </BreadcrumbPage>
              )}
              {!isLast && <span className="breadcrumb-separator">/</span>}{" "}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
