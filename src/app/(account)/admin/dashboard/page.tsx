import { format, isMatch } from "date-fns";
import { redirect } from "next/navigation";

import LastTransactions from "./_components/last-transactions";
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
    <div className="flex flex-col space-y-6 sm:overflow-hidden p-2 sm:p-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold text-black">Dashboard</h1>
        <TimeSelect />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 sm:gap-6 gap-y-4 sm:overflow-hidden order-2 sm:order-none">
        <div className="flex flex-col col-span-2 gap-6 sm:overflow-hidden order-1 sm:order-none">
          <SummaryCards {...dashboard} />
          <div className="grid h-full grid-cols-3 grid-rows-1 gap-6 sm:overflow-hidden">
            {/* <TransactionPieChart {...dashboard} month={searchParams.month} />
            <ExpensesPerCategory
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
