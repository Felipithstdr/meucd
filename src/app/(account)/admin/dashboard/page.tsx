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
      <div className="flex flex-wrap justify-between gap-4">
        <h1 className="min-w-full text-2xl font-bold text-black sm:min-w-fit">
          Dashboard
        </h1>

        <div className="sm:w-xs w-sm grid grid-cols-2 items-center justify-center gap-4 overflow-x-auto sm:gap-4">
          <div className="cols-span-1 rounded-lg bg-green-100 px-4 py-1 text-right text-green-800 shadow">
            <p className="flex items-center justify-start gap-1 text-sm font-medium">
              <Wallet className="h-5 w-5" /> Saldo Atual
            </p>
            <p className="text-lg font-bold">
              {formatCurrency(dashboard.currentBalance)}
            </p>
          </div>

          <div className="cols-span-1">
            <TimeSelect />
          </div>
        </div>
      </div>

      <div className="order-2 grid grid-cols-1 gap-y-4 sm:order-none sm:grid-cols-3 sm:gap-6 sm:overflow-hidden">
        <div className="order-1 col-span-2 flex flex-col gap-6 sm:order-none sm:overflow-hidden">
          <SummaryCards {...dashboard} />
          <div className="grid h-full gap-6 sm:grid-cols-3 sm:grid-rows-1 sm:overflow-hidden">
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
