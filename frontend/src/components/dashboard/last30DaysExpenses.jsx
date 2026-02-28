import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { prepareExpenseBarChartData } from "../../utils/helper";
import Barchart from "../Charts/Barchart";

const Last30DaysExpenses = ({ data }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseBarChartData(data);
    setChartData(result);
  }, [data]);

  return (
    <motion.div
      whileHover={{
        boxShadow: "0px 0px 40px rgba(99,102,241,0.15)",
      }}
      transition={{ duration: 0.3 }}
      className="
        backdrop-blur-xl
        bg-white/[0.06]
        border border-white/10
        rounded-2xl
        p-6
        shadow-[0_8px_32px_rgba(0,0,0,0.25)]
        transition-all duration-300
      "
    >
      <div className="mb-6">
        <h5 className="text-lg font-semibold text-slate-200 tracking-tight">
          Last 30 Days Expenses
        </h5>
      </div>

      <Barchart
        data={chartData}
        xAxisKey="category"
        barKey="amount"
      />
    </motion.div>
  );
};

export default Last30DaysExpenses;