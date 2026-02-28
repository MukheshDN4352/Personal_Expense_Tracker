import React from "react";
import { motion } from "framer-motion";
import moment from "moment";
import { addThousandsSeperator } from "../../utils/helper";

const MonthlySummary = ({ monthlySummary = [] }) => {
  return (
    <div
      className="
        bg-white/[0.04]
        border border-white/10
        rounded-2xl
        p-6
        transition-all duration-300
      "
    >
      {/* Header */}
      <div className="mb-6">
        <h5 className="text-lg font-semibold text-slate-200 tracking-tight">
          Monthly Summary
        </h5>
      </div>

      {/* Monthly Cards */}
      <div className="space-y-4">
        {monthlySummary.map((item, index) => {
          const balance = item.income - item.expense;

          const monthLabel = moment()
            .month(item.month - 1)
            .year(item.year)
            .format("MMMM YYYY");

          return (
            <motion.div
              key={index}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
              className="
                p-4
                rounded-xl
                bg-white/[0.04]
                border border-white/10
                transition-all duration-300
                hover:bg-white/[0.07]
              "
            >
              {/* Top Row */}
              <div className="flex justify-between items-center mb-4">
                <h6 className="text-sm font-medium text-slate-200">
                  {monthLabel}
                </h6>

                <div
                  className={`
                    px-4 py-1.5
                    rounded-lg
                    border
                    text-sm font-medium
                    backdrop-blur-md
                    ${
                      balance >= 0
                        ? "bg-emerald-500/10 border-emerald-400/20 text-emerald-400"
                        : "bg-rose-500/10 border-rose-400/20 text-rose-400"
                    }
                  `}
                >
                  {balance >= 0 ? "+" : "-"}$
                  {addThousandsSeperator(Math.abs(balance))}
                </div>
              </div>

              {/* Income & Expense */}
              <div className="grid grid-cols-2 gap-6 text-sm">
                <div className="flex flex-col">
                  <span className="text-slate-400">Income</span>
                  <span className="text-emerald-400 font-medium mt-1">
                    ${addThousandsSeperator(item.income)}
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="text-slate-400">Expense</span>
                  <span className="text-rose-400 font-medium mt-1">
                    ${addThousandsSeperator(item.expense)}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default MonthlySummary;