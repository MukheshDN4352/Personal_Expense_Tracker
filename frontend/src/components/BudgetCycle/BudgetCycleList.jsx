import React from "react";
import moment from "moment";
import { LuDownload, LuTrash } from "react-icons/lu";

const BudgetCycleList = ({ data, onDelete, onDownload }) => {
  const { budgetCycle, totalExpenses, remainingAmount, expenses } =
    data;

  return (
    <div className="
      relative w-full rounded-2xl p-8
      backdrop-blur-2xl
      bg-white/[0.04]
      border border-white/[0.08]
      shadow-[0_15px_50px_rgba(0,0,0,0.45)]
      text-white
    ">
      <div className="flex justify-between items-center mb-6">
        <h5 className="text-xl font-semibold">
          {budgetCycle.name}
        </h5>

        <div className="flex gap-3">
          <button
            onClick={() => onDownload(budgetCycle._id)}
            className="glass-btn"
          >
            <LuDownload />
          </button>

          <button
            onClick={() => onDelete(budgetCycle._id)}
            className="glass-btn text-red-400"
          >
            <LuTrash />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <Info label="Limit" value={budgetCycle.upperLimitAmount} />
        <Info label="Total Expenses" value={totalExpenses} />
        <Info label="Remaining" value={remainingAmount} />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {expenses?.map((item) => (
          <div
            key={item._id}
            className="p-4 rounded-xl bg-white/[0.05] border border-white/[0.08]"
          >
            <p>{item.category}</p>
            <p className="text-sm text-gray-400">
              {moment(item.date).format("Do MMM YYYY")}
            </p>
            <p className="text-rose-400 mt-2">
              ₹{item.amount}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const Info = ({ label, value }) => (
  <div className="p-4 rounded-xl bg-white/[0.05] border border-white/[0.08]">
    <p className="text-gray-400 text-sm">{label}</p>
    <p className="text-lg font-semibold mt-1">
      ₹{value}
    </p>
  </div>
);

export default BudgetCycleList;