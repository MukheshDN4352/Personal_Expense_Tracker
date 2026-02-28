import React from "react";
import { LuDownload } from "react-icons/lu";
import TransactionInfoCard from "../cards/TransactionInfoCard";
import moment from "moment";

const ExpenseList = ({ transactions, onDelete, onDownLoad }) => {
  return (
    <div
      className="
        relative
        w-full
        mt-10
        rounded-2xl
        p-8
        backdrop-blur-2xl
        bg-white/[0.04]
        border border-white/[0.08]
        shadow-[0_15px_50px_rgba(0,0,0,0.45)]
        overflow-hidden
      "
    >
      {/* subtle reflection layer */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/[0.05] via-transparent to-transparent pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-8">
        <h5 className="text-[20px] font-semibold text-white tracking-tight">
          Expense sources
        </h5>

        <button
          onClick={onDownLoad}
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
          <LuDownload className="text-base opacity-80" />
          Download
        </button>
      </div>

      {/* Transactions Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        {transactions?.map((item) => (
          <TransactionInfoCard
            key={item._id}
            title={item.category}
            icon={item.icon}
            date={moment(item.date).format("Do MMM YYYY")}
            amount={item.amount}
            type="expense"
            onDelete={() => onDelete(item._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ExpenseList;