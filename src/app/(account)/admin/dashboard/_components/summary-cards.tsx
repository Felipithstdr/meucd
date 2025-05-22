import {
  BanknoteArrowUp,
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  Users,
} from "lucide-react";

import SummaryCard from "./summary-card";

interface SummaryCardsProps {
  totalCustomers: number;
  yearlyNetProfit: number;
  MonthlyNetProfit: number;
  monthlyBillingeCNPJ: number;
  monthlyBillingeCPF: number;
  monthlyOutputs: number;
}

const SummaryCards = async ({
  totalCustomers,
  yearlyNetProfit,
  MonthlyNetProfit,
  monthlyBillingeCNPJ,
  monthlyBillingeCPF,
  monthlyOutputs,
}: SummaryCardsProps) => {
  return (
    <div className="space-y-6">
      {/* PRIMEIRO CARD */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        <SummaryCard
          icon={<Users color="black" />}
          title="Total Clientes"
          amount={totalCustomers}
          size="large"
        />

        <SummaryCard
          icon={<PiggyBankIcon color="black" />}
          title="Lucro Anual"
          amount={yearlyNetProfit}
          money
          size="large"
        />
        <SummaryCard
          icon={<TrendingUpIcon className="text-success" />}
          title="Lucro Mensal"
          amount={MonthlyNetProfit}
          money
          size="large"
        />
      </div>

      {/* OUTROS CARD */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        <SummaryCard
          icon={<BanknoteArrowUp className="text-blue-500" />}
          title="Receita eCPF Mensal"
          amount={monthlyBillingeCPF}
          money
        />
        <SummaryCard
          icon={<BanknoteArrowUp className="text-amber-400" />}
          title="Receita eCNPJ Mensal"
          amount={monthlyBillingeCNPJ}
          money
        />
        <SummaryCard
          icon={<TrendingDownIcon className="text-red-500" />}
          title="Saídas Mensal"
          amount={monthlyOutputs}
          money
        />
      </div>
    </div>
  );
};

export default SummaryCards;
