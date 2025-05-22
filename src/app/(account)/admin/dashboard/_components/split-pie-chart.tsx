"use client";

import { Pie, PieChart, Sector } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";

import { MONTH_OPTIONS } from "../_constants/payments";
import PercentageItem from "./percentage-item";

const chartConfig = {
  personX: {
    label: "Lucimar Antônio",
    color: "#EAB308",
  },
  personY: {
    label: "Felipi Tidra",
    color: "#10B981",
  },
} satisfies ChartConfig;

interface SplitProps {
  monthlyNetProfit: number;
  month: string;
}

export const SplitPieChart = ({ monthlyNetProfit, month }: SplitProps) => {
  const profitSplit = {
    personX: 0.3333,
    personY: 0.3333,
  };

  const chartData = [
    {
      type: "personX",
      amount: monthlyNetProfit * profitSplit.personX,
      fill: chartConfig.personX.color,
    },
    {
      type: "personY",
      amount: monthlyNetProfit * profitSplit.personY,
      fill: chartConfig.personY.color,
    },
  ];

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Divisão dos Lucros</CardTitle>
        <CardDescription>
          {MONTH_OPTIONS.find((option) => option.value === month)?.label}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={({ payload }) => {
                if (!payload || !payload.length) return null;
                const data = payload[0].payload;
                const key = data.type as keyof typeof chartConfig;
                return (
                  <div className="rounded bg-white p-2 shadow">
                    <div>{chartConfig[key].label}</div>
                    <div>
                      R${" "}
                      {data.amount.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </div>
                  </div>
                );
              }}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="type"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={0}
              activeShape={({
                outerRadius = 0,
                ...props
              }: PieSectorDataItem) => (
                <Sector {...props} outerRadius={outerRadius + 10} />
              )}
            />
          </PieChart>
        </ChartContainer>

        <div className="space-y-3">
          {Object.entries(profitSplit).map(([key, percent]) => (
            <PercentageItem
              key={key}
              icon={
                <div
                  className="h-4 w-4 rounded-full"
                  style={{
                    backgroundColor:
                      chartConfig[key as keyof typeof chartConfig].color,
                  }}
                />
              }
              title={chartConfig[key as keyof typeof chartConfig].label}
              value={percent * 100}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
