import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import Barchart from "../Charts/Barchart";
import { prepareIncomeBarchartData } from "../../utils/helper";

const IncomeOverview = ({ transactions, onAddIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareIncomeBarchartData(transactions);
    setChartData(result);
  }, [transactions]);

  return (
    <div
      className="
        relative
        w-full
        rounded-2xl
        p-8
        backdrop-blur-2xl
        bg-white/[0.04]
        border border-white/[0.08]
        shadow-[0_15px_50px_rgba(0,0,0,0.45)]
        overflow-hidden
      "
    >
      {/* subtle reflection */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/[0.06] via-transparent to-transparent pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex items-start justify-between">
        <div>
          <h5 className="text-[22px] font-semibold text-white tracking-tight">
            Income Overview
          </h5>
          <p className="text-sm text-gray-400 mt-2 max-w-md leading-relaxed">
            Track your earnings over time and analyze your income transactions
          </p>
        </div>

        {/* Refined Glass Button */}
        <button
          onClick={onAddIncome}
          className="
            flex items-center gap-2
            px-5 py-2.5
            rounded-xl
            backdrop-blur-xl
            bg-white/[0.06]
            border border-white/[0.12]
            text-amber-300
            font-medium
            transition-all duration-200 ease-out
            hover:bg-white/[0.09]
            hover:border-white/[0.18]
            active:scale-[0.97]
          "
        >
          <LuPlus className="text-base opacity-80" />
          Add Income
        </button>
      </div>

      {/* Chart */}
      <div className="mt-12 relative z-10">
        <Barchart 
          data={chartData}
          xAxisKey="source"
          barKey="amount"
        />
      </div>
    </div>
  );
};

export default IncomeOverview;