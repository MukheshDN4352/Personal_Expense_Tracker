import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { LuArrowLeft, LuDownload, LuTrash } from "react-icons/lu";
import moment from "moment";

import Dashboardlayout from "../../components/layouts/DashboardLayout";
import Modal from "../../components/Modal";
import DeleteAlert from "../../components/layouts/DeleteAlert";

import { useBudgetCycleStore } from "../../store/useBudgetCycleStore";
import WaterLimitIndicator from "../../components/BudgetCycle/WaterLimitIndicator";

const BudgetCycleDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const {
    selectedBudgetCycle,
    getBudgetCycleById,
    deleteBudgetCycle,
    downloadBudgetCycle,
    isFetchingSingleBudgetCycle,
  } = useBudgetCycleStore();

  useEffect(() => {
    if (id) getBudgetCycleById(id);
  }, [id, getBudgetCycleById]);

  if (isFetchingSingleBudgetCycle || !selectedBudgetCycle) {
    return (
      <Dashboardlayout activeMenu="BudgetCycle">
        <div className="text-white">Loading...</div>
      </Dashboardlayout>
    );
  }

  const { budgetCycle, totalExpenses, remainingAmount, expenses } =
    selectedBudgetCycle;

  // ✅ Extract Dates
  const startDate = moment(budgetCycle.startDate);
  const endDate = moment(budgetCycle.endDate);
  const today = moment();

  // ✅ Calculate Remaining Days
  const remainingDays = endDate.diff(today, "days");

  return (
    <Dashboardlayout activeMenu="BudgetCycle">
      <div className="space-y-8">

        {/* Back Button */}
        <button
          onClick={() => navigate("/budgetCycle")}
          className="
            flex items-center gap-2
            text-amber-300
            backdrop-blur-xl
            bg-white/[0.05]
            border border-white/[0.1]
            px-4 py-2 rounded-xl
            hover:bg-white/[0.08]
          "
        >
          <LuArrowLeft />
          Back
        </button>

        {/* Main Glass Card */}
        <div className="
          rounded-2xl p-8
          backdrop-blur-2xl
          bg-white/[0.04]
          border border-white/[0.08]
          shadow-[0_15px_50px_rgba(0,0,0,0.45)]
          text-white
        ">

          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-semibold">
              {budgetCycle.name}
            </h2>

            <div className="flex gap-4">
              <button
                onClick={() => downloadBudgetCycle(budgetCycle._id)}
                className="glass-btn"
              >
                <LuDownload />
              </button>

              <button
                onClick={() => setShowDeleteModal(true)}
                className="glass-btn text-red-400"
              >
                <LuTrash />
              </button>
            </div>
          </div>

          {/* Financial Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <InfoCard
              label="Limit"
              value={`₹${budgetCycle.upperLimitAmount}`}
            />
            <InfoCard
              label="Total Expenses"
              value={`₹${totalExpenses}`}
            />
            <InfoCard
              label="Remaining"
              value={`₹${remainingAmount}`}
              highlight={remainingAmount < 0}
            />
          </div>

          {/* Date & Duration Glass Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <InfoCard
              label="Start Date"
              value={startDate.format("Do MMM YYYY")}
            />
            <InfoCard
              label="End Date"
              value={endDate.format("Do MMM YYYY")}
            />
            <InfoCard
              label="Remaining Days"
              value={
                remainingDays >= 0
                  ? `${remainingDays} days`
                  : "Cycle Ended"
              }
              highlight={remainingDays < 0}
            />
          </div>

          {/* Expense List */}
         {/* Expenses + Water Bar Layout */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

  {/* LEFT — Expenses (stacked vertically) */}
  <div className="lg:col-span-2 space-y-6">
    {expenses?.map((item) => (
      <div
        key={item._id}
        className="
          p-5 rounded-xl
          backdrop-blur-xl
          bg-white/[0.05]
          border border-white/[0.08]
        "
      >
        <h6>{item.category}</h6>
        <p className="text-sm text-gray-400 mt-1">
          {moment(item.date).format("Do MMM YYYY")}
        </p>
        <p className="text-rose-400 mt-2">
          ₹{item.amount}
        </p>
      </div>
    ))}
  </div>

  {/* RIGHT — Water Limit Indicator */}
  <div className="flex justify-center">
    <WaterLimitIndicator
      upperLimit={budgetCycle.upperLimitAmount}
      totalExpenses={totalExpenses}
    />
  </div>
</div>
        </div>
      </div>

      {/* DELETE CONFIRMATION MODAL */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Budget Cycle"
      >
        <DeleteAlert
          content="Are you sure you want to delete this budget cycle? This action cannot be undone."
          onDelete={async () => {
            setShowDeleteModal(false);
            setTimeout(async () => {
              await deleteBudgetCycle(budgetCycle._id);
              navigate("/budgetCycle");
            }, 200);
          }}
        />
      </Modal>
    </Dashboardlayout>
  );
};

const InfoCard = ({ label, value, highlight }) => (
  <div
    className={`
      p-5 rounded-xl
      backdrop-blur-xl
      bg-white/[0.05]
      border border-white/[0.08]
      transition-all duration-300
      ${highlight ? "shadow-[0_0_25px_rgba(255,0,0,0.25)]" : ""}
    `}
  >
    <p className="text-gray-400 text-sm">{label}</p>
    <p
      className={`text-lg font-semibold mt-2 ${
        highlight ? "text-red-400" : "text-white"
      }`}
    >
      {value}
    </p>
  </div>
);

export default BudgetCycleDetails;