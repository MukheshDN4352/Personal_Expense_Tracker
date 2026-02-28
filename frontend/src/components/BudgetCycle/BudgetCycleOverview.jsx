import React from "react";
import { LuPlus, LuArrowRight } from "react-icons/lu";

const BudgetCycleOverview = ({ cycles, onCreate, onSelect }) => {
  return (
    <div
      className="
      relative w-full rounded-2xl p-8
      backdrop-blur-2xl
      bg-white/[0.04]
      border border-white/[0.08]
      shadow-[0_15px_50px_rgba(0,0,0,0.45)]
    "
    >
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h5 className="text-[22px] font-semibold text-white">
            Budget Cycles
          </h5>
          <p className="text-gray-400 text-sm mt-2">
            Manage your spending periods
          </p>
        </div>

        <button
          onClick={onCreate}
          className="
            flex items-center gap-2 px-5 py-2.5
            rounded-xl backdrop-blur-xl
            bg-white/[0.06]
            border border-white/[0.12]
            text-amber-300
            hover:bg-white/[0.09]
            transition
          "
        >
          <LuPlus />
          Create
        </button>
      </div>

      {/* Cycles List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {cycles?.length === 0 && (
          <p className="text-gray-500">No Budget Cycle Found</p>
        )}

          {cycles?.map((cycle) => (
            <div
              key={cycle._id}
              className="
                flex justify-between items-center
                p-8 rounded-2xl
                bg-white/[0.06]
                border border-white/[0.08]
                hover:bg-white/[0.08]
                transition-all duration-300
              "
            >
              {/* LEFT CONTENT */}
              <div className="space-y-5">
                {/* Name */}
                <h6 className="text-white font-bold text-2xl tracking-wide">
                  {cycle.name}
                </h6>

                {/* Upper Limit Section */}
                <div>
                  <span className="block text-gray-500 text-sm">
                    Upper Limit
                  </span>
                  <span className="text-amber-300 text-2xl font-semibold">
                    ₹{cycle.upperLimitAmount}
                  </span>
                </div>

                {/* Dates Row */}
                <div className="flex gap-12">
                  <div>
                    <span className="block text-gray-500 text-sm">
                      Start Date
                    </span>
                    <span className="text-base text-gray-300 font-medium">
                      {new Date(cycle.startDate).toLocaleDateString()}
                    </span>
                  </div>

                  <div>
                    <span className="block text-gray-500 text-sm">
                      End Date
                    </span>
                    <span className="text-base text-gray-300 font-medium">
                      {new Date(cycle.endDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* RIGHT ARROW (Clean Glass, No Glow) */}
              <button
                onClick={() => onSelect(cycle._id)}
                className="
                  flex items-center justify-center
                  w-12 h-12 rounded-full
                  backdrop-blur-xl
                  bg-amber-400/10
                  border border-amber-400/30
                  text-amber-300
                  hover:bg-amber-400/20
                  transition-all duration-300
                "
              >
                <LuArrowRight size={20} />
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default BudgetCycleOverview;