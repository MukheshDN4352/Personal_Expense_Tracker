import React from "react";
import { LuArrowRight } from "react-icons/lu";
import moment from "moment";
import { motion } from "framer-motion";
import TransactionInfoCard from "../cards/TransactionInfoCard";

const RecentIncome = ({ transactions, onSeeMore }) => {
  return (
    <motion.div
      whileHover={{
        boxShadow: "0px 0px 40px rgba(34,197,94,0.12)", // subtle green glow (not bright)
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
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h5 className="text-lg font-semibold text-slate-200 tracking-tight">
          Income
        </h5>

        <motion.button
          whileHover={{ x: 5 }}
          onClick={onSeeMore}
          className="
            flex items-center gap-2
            px-4 py-2
            rounded-xl
            backdrop-blur-md
            bg-white/10
            border border-white/20
            text-sm font-medium
            text-slate-200
            hover:bg-white/20
            transition-all duration-300
          "
        >
          See All
          <LuArrowRight className="text-base" />
        </motion.button>
      </div>

      {/* Transactions */}
      <div className="space-y-4">
        {transactions?.slice(0, 5)?.map((income) => (
          <TransactionInfoCard
            key={income._id}
            title={income.source}
            icon={income.icon}
            date={moment(income.date).format("Do MMM YYYY")}
            amount={income.amount}
            type="income"
            hideDeleteBtn
          />
        ))}
      </div>
    </motion.div>
  );
};

export default RecentIncome;