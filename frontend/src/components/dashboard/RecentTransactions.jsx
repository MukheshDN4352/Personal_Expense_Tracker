import React from "react";
import { LuArrowRight } from "react-icons/lu";
import moment from "moment";
import { motion } from "framer-motion";
import TransactionInfoCard from "../cards/TransactionInfoCard";

const RecentTransactions = ({ transactions, onSeeMore }) => {
  return (
    <div
      className="
        backdrop-blur-xl
        bg-white/5
        border border-white/10
        rounded-2xl
        p-6
        shadow-[0_8px_32px_rgba(0,0,0,0.25)]
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h5 className="text-lg font-semibold text-slate-200 tracking-tight">
          Recent Transactions
        </h5>

      
      </div>

      {/* Transactions List */}
      <div className="space-y-4">
        {transactions?.slice(0, 5)?.map((item) => (
          <TransactionInfoCard
            key={item._id}
            title={item.type === "expense" ? item.category : item.source}
            icon={item.icon}
            date={moment(item.date).format("Do MMM YYYY")}
            amount={item.amount}
            type={item.type}
            hideDeleteBtn
          />
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;