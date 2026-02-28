import React from "react";
import { motion } from "framer-motion";
import CustomPieChart from "../Charts/CustomPieChart";

const COLORS = ["#6366F1", "#10B981", "#F43F5E"];

const FinancialOverview = ({
  totalBalance,
  totalIncome,
  totalExpense,
}) => {
  const balanceData = [
    { name: "Total Balance", amount: totalBalance },
    { name: "Total Income", amount: totalIncome },
    { name: "Total Expense", amount: totalExpense },
  ];

  return (
    <motion.div
      whileHover={{
        boxShadow: "0px 0px 40px rgba(59,130,246,0.15)",
      }}
      transition={{ duration: 0.3 }}
      className="
        backdrop-blur-xl
        bg-white/5
        border border-white/10
        rounded-2xl
        p-6
        shadow-[0_8px_32px_rgba(0,0,0,0.25)]
        transition-all duration-300
      "
    >
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-lg font-semibold text-slate-200 tracking-tight">
          Financial Overview
        </h5>
      </div>

      <CustomPieChart
        data={balanceData}
        label="Total Balance"
        totalAmount={`$${totalBalance}`}
        colors={COLORS}
        showTextAnchor
      />
    </motion.div>
  );
};

export default FinancialOverview;