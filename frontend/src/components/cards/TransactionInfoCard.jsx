import React from "react";
import {
  LuUtensils,
  LuTrendingUp,
  LuTrendingDown,
  LuTrash2,
  LuReceipt
} from "react-icons/lu";
import { motion } from "framer-motion";

const ans = 1;

const TransactionInfoCard = ({
  title,
  icon,
  date,
  amount,
  type,
  hideDeleteBtn,
  onDelete,
}) => {
  const isIncome = type === "income";

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className="
        flex items-center gap-4
        p-4
        rounded-xl
        bg-white/[0.04]
        border border-white/10
        transition-all duration-300
        hover:bg-white/[0.07]
      "
    >
      {/* Icon */}
      <div
        className="
          w-12 h-12
          flex items-center justify-center
          rounded-full
          bg-white/10
          border border-white/10
          text-slate-200
        "
      >
        {icon ? (
          <img
            src={icon}
            alt={title}
            className="h-6 w-6 object-contain opacity-90"
          />
        ) : (
          <LuReceipt size={20} />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-200">
            {title}
          </p>
          <p className="text-xs text-slate-400 mt-1">
            {date}
          </p>
        </div>

        <div className="flex items-center gap-4">

          {/* Always Visible Delete Button */}
          {!hideDeleteBtn && (
            <button
              onClick={onDelete}
              className="
                p-2
                rounded-lg
                bg-rose-500/10
                border border-rose-400/20
                text-rose-400
                transition-all duration-200
                hover:bg-rose-500/20
                active:scale-95
              "
            >
              <LuTrash2 size={16} />
            </button>
          )}

          {/* Amount Badge */}
          <div
            className={`
              flex items-center gap-2
              px-4 py-1.5
              rounded-lg
              backdrop-blur-md
              border
              text-sm font-medium
              ${
                isIncome
                  ? "bg-emerald-500/10 border-emerald-400/20 text-emerald-400"
                  : "bg-rose-500/10 border-rose-400/20 text-rose-400"
              }
            `}
          >
            {isIncome ? "+" : "-"}${amount}
            {isIncome ? (
              <LuTrendingUp size={16} />
            ) : (
              <LuTrendingDown size={16} />
            )}
          </div>

        </div>
      </div>
    </motion.div>
  );
};

export default TransactionInfoCard;