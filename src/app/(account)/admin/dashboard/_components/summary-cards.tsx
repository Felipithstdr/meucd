import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon, Users } from "lucide-react";

import SummaryCard from "./summary-card";

interface SummaryCardsProps {
  totalCustomers: number;
  yearlyRevenue: number;
  balanceMonthly: number;
  balanceMonthlyeCNPJ: number;
  balanceMonthlyeCPF: number;
  balanceMonthlyExpenses: number;
}

const SummaryCards = async ({
  totalCustomers,
  yearlyRevenue,
  balanceMonthly,
  balanceMonthlyeCNPJ,
  balanceMonthlyeCPF,
  balanceMonthlyExpenses,
}: SummaryCardsProps) => {
  return (
    <div className="space-y-6">
      {/* PRIMEIRO CARD */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        <SummaryCard
          icon={<Users color="white" />}
          title="Total Clientes"
          amount={totalCustomers}
          size="large"
        />

        <SummaryCard
          icon={<PiggyBankIcon color="white" />}
          title="Receita Anual"
          amount={yearlyRevenue}
          money
          size="large"
        />
        <SummaryCard
          icon={<TrendingUpIcon className="text-white" />}
          title="Receita Mensal"
          amount={balanceMonthly}
          money
          size="large"
        />
      </div>

      {/* OUTROS CARD */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        <SummaryCard
          icon={<TrendingUpIcon className="text-success" />}
          title="Faturamento eCPF Mensal"
          amount={balanceMonthlyeCPF}
          money
        />
        <SummaryCard
          icon={<TrendingUpIcon className="text-amber-400" />}
          title="Faturamento eCNPJ Mensal"
          amount={balanceMonthlyeCNPJ}
          money
        />
        <SummaryCard
          icon={<TrendingDownIcon className="text-red-500" />}
          title="Despesas Mensal"
          amount={balanceMonthlyExpenses}
          money
        />
      </div>
    </div>
  );
};

export default SummaryCards;
