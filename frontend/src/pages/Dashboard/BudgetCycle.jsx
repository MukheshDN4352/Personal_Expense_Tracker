import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dashboardlayout from "../../components/layouts/DashboardLayout";
import Modal from "../../components/Modal";

import { useBudgetCycleStore } from "../../store/useBudgetCycleStore";
import BudgetCycleOverview from "../../components/BudgetCycle/BudgetCycleOverview";
import CreateBudgetCycle from "../../components/BudgetCycle/CreateBudgetCycle";

const BudgetCycle = () => {
  const navigate = useNavigate();

  const {
    budgetCycles,
    getAllBudgetCycles,
    isFetchingBudgetCycles,
  } = useBudgetCycleStore();

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    getAllBudgetCycles();
  }, [getAllBudgetCycles]);

  if (isFetchingBudgetCycles) {
    return (
      <Dashboardlayout activeMenu="BudgetCycle">
        <div className="text-white">Loading Budget Cycles...</div>
      </Dashboardlayout>
    );
  }

  return (
    <Dashboardlayout activeMenu="BudgetCycle">
      <div className="space-y-8">
        <BudgetCycleOverview
          cycles={budgetCycles}
          onCreate={() => setOpenModal(true)}
          onSelect={(id) => navigate(`/budgetCycle/${id}`)}
        />
      </div>

      <Modal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        title="Create Budget Cycle"
      >
        <CreateBudgetCycle
          onSuccess={() => {
            setOpenModal(false);
            getAllBudgetCycles();
          }}
        />
      </Modal>
    </Dashboardlayout>
  );
};

export default BudgetCycle;