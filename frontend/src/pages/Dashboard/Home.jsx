import React, { useEffect } from "react";
import Dashboardlayout from "../../components/layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";
import { useDashboardStore } from "../../store/useDashboardStore";

import InfoCard from "../../components/cards/InfoCards";
import RecentTransactions from "../../components/dashboard/RecentTransactions";
import ExpenseTransactions from "../../components/dashboard/ExpenseTransactions";
import Last30DaysExpenses from "../../components/dashboard/last30DaysExpenses";
import FinancialOverview from "../../components/dashboard/FinanceOverview";
import RecentIncomeWithChart from "../../components/dashboard/RecentIncomeWithChart";
import RecentIncome from "../../components/dashboard/RecentIncome";
import MonthlySummary from "../../components/dashboard/MonthlySummary";

import { addThousandsSeperator } from "../../utils/helper";
import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import { IoMdCard } from "react-icons/io";

const Home = () => {
  const navigate = useNavigate();

  const {
    dashboardData,
    getDashboardData,
    isLoadingDashboard,
  } = useDashboardStore();

  useEffect(() => {
    getDashboardData();
  }, [getDashboardData]);

  if (isLoadingDashboard) {
    return (
      <Dashboardlayout activeMenu="Dashboard">
        <div className="flex justify-center items-center h-64">
          <p className="text-lg">Loading dashboard...</p>
        </div>
      </Dashboardlayout>
    );
  }

  return (
    <Dashboardlayout activeMenu="Dashboard">
      <div className="my-5 mx-auto">
        {/* ===== TOP INFO CARDS ===== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <InfoCard
              icon={<IoMdCard />}
              label="Total Balance"
              value={addThousandsSeperator(dashboardData?.totals?.balance || 0)}
              color="bg-indigo-500"
            />

            <InfoCard
              icon={<LuWalletMinimal />}
              label="Total Income"
              value={addThousandsSeperator(dashboardData?.totals?.income || 0)}
              color="bg-emerald-500"
            />

            <InfoCard
              icon={<LuHandCoins />}
              label="Total Expense"
              value={addThousandsSeperator(dashboardData?.totals?.expense || 0)}
              color="bg-rose-500"
            />
        </div>

        {/* ===== MAIN GRID ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">


              {/* Financial Overview */}
          <FinancialOverview
            totalBalance={dashboardData?.totals?.balance || 0}
            totalIncome={dashboardData?.totals?.income || 0}
            totalExpense={dashboardData?.totals?.expense || 0}
          />


            <Last30DaysExpenses
            data={
              dashboardData?.last30DaysExpenses?.transactions || []
            }
          />
          {/* Recent Transactions */}
          <RecentTransactions
            transactions={dashboardData?.recentTransactions || []}
            onSeeMore={() => navigate("/expense")}
          />

                   <MonthlySummary
  monthlySummary={dashboardData?.monthlySummary || []}
/>

      

          {/* Last 30 Days Expenses Table */}
          <ExpenseTransactions
            transactions={
              dashboardData?.last30DaysExpenses?.transactions || []
            }
            onSeeMore={() => navigate("/expense")}
          />

          {/* Last 30 Days Expense Chart */}
        

          {/* Recent Income Chart */}


          {/* Recent Income Table */}
          <RecentIncome
            transactions={
              dashboardData?.last60DaysIncome?.transactions || []
            }
            onSeeMore={() => navigate("/income")}
          />
        </div>
      </div>
    </Dashboardlayout>
  );
};

export default Home;