import { format, isMatch } from "date-fns";
import { Wallet } from "lucide-react";
import { redirect } from "next/navigation";

import { formatCurrency } from "@/helpers/mask";

import LastTransactions from "./_components/last-transactions";
import { SplitPieChart } from "./_components/split-pie-chart";
import SummaryCards from "./_components/summary-cards";
import TimeSelect from "./_components/time-select";
import { getDashboard } from "./_data/get-dashboard";

interface AdminProps {
  searchParams: Promise<{ month?: string }>;
}

const DashboardPage = async ({ searchParams }: AdminProps) => {
  const month = (await searchParams).month;

  // Acessando um parâmetro específico
  const monthIsInvalid = !month || !isMatch(month, "MM");

  if (monthIsInvalid) {
    const formattedMonth = format(new Date(), "MM");
    redirect(`/admin/dashboard?month=${formattedMonth}`);
  }

  const dashboard = await getDashboard(month);

  return (
    <div className="flex flex-col space-y-6 p-2 sm:overflow-hidden sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-black">Dashboard</h1>
        <div className="flex flex-wrap items-center gap-4">
          <div className="min-w-[180px] rounded-xl bg-green-100 px-4 py-1 text-right text-green-800 shadow-sm">
            <p className="flex items-center gap-1 text-sm font-medium">
              <Wallet className="h-5 w-5" /> Saldo Atual
            </p>
            <p className="text-lg font-bold">
              {formatCurrency(dashboard.currentBalance)}
            </p>
          </div>

          <div className="min-w-[160px] max-w-[200px]">
            <TimeSelect />
          </div>
        </div>
      </div>

      <div className="order-2 grid grid-cols-1 gap-y-4 sm:order-none sm:grid-cols-3 sm:gap-6 sm:overflow-hidden">
        <div className="order-1 col-span-2 flex flex-col gap-6 sm:order-none sm:overflow-hidden">
          <SummaryCards {...dashboard} />
          <div className="grid h-full grid-cols-3 grid-rows-1 gap-6 sm:overflow-hidden">
            <SplitPieChart {...dashboard} month={monthIsInvalid ? "" : month} />
            {/* <ExpensesPerCategory
              expesensPerCategory={dashboard.totalExpensePerCategory}
            /> */}
          </div>
        </div>
        <LastTransactions {...dashboard} />
      </div>
    </div>
  );
};

export default DashboardPage;
