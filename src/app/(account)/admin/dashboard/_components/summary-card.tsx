"use client";

import { Card, CardBody, CardHeader } from "@heroui/react";
import { ReactNode } from "react";

import { formatCurrency } from "@/helpers/mask";

interface SummaryCardProps {
  icon: ReactNode;
  title: string;
  amount: number;
  size?: "small" | "large";
  money?: boolean;
}

const SummaryCard = ({
  icon,
  title,
  amount,
  size = "small",
  money,
}: SummaryCardProps) => {
  return (
    <Card className={`${size === "large" && "bg-black"}`} shadow="sm">
      <CardHeader className="flex-row items-center gap-4">
        <div className="rounded-xl bg-gray-100 p-1">{icon}</div>
        <p
          className={`${size === "small" ? "text-muted-foreground" : "font-bold text-white"}`}
        >
          {title}
        </p>
      </CardHeader>
      <CardBody className="flex justify-between">
        <p
          className={`font-bold ${size === "small" ? "text-2xl" : "text-4xl text-white"}`}
        >
          {money ? formatCurrency(amount) : amount}
        </p>
      </CardBody>
    </Card>
  );
};

export default SummaryCard;
