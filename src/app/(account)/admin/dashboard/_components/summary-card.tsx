import { ReactNode } from "react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
    <Card className={`${size === "large" && "bg-black"}`} >
      <CardHeader className="flex-row items-center gap-4">
        {icon}
        <p
          className={`${size === "small" ? "text-muted-foreground" : "font-bold text-white"}`}
        >
          {title}
        </p>
      </CardHeader>
      <CardContent className="flex justify-between">
        <p
          className={`font-bold ${size === "small" ? "text-2xl" : "text-4xl text-white"}`}
        >
          {money ? formatCurrency(amount) : amount}
        </p>
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
