import React, { useEffect, useState } from "react";
import Dashboardlayout from "../../components/layouts/DashboardLayout";
import IncomeOverview from "../../components/Income/IncomeOverview";
import Modal from "../../components/Modal";
import AddIncomeForm from "../../components/Income/AddIncomeForm";
import DeleteAlert from "../../components/layouts/DeleteAlert";
import IncomeList from "../../components/Income/IncomeList";
import toast from "react-hot-toast";

import { useIncomeStore } from "../../store/useIncomeStore";
import { useAuthStore } from "../../store/useAuthStore";

const Income = () => {
  // ================= AUTH STORE =================
  const { authUser, checkAuth } = useAuthStore();

  // ================= INCOME STORE =================
  const {
    incomes,
    addIncome,
    getAllIncome,
    deleteIncome,
    downloadIncomeExcel,
    isFetchingIncome,
  } = useIncomeStore();

  // ================= LOCAL UI STATE =================
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  // ================= CHECK AUTH + FETCH DATA =================
  useEffect(() => {
    checkAuth();
    getAllIncome();
  }, []);

  // ================= HANDLE ADD INCOME =================
  const handleAddIncome = async (income) => {
    const { source, amount, date, icon } = income;

    if (!source.trim()) {
      toast.error("Source is required");
      return;
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount should be greater than zero");
      return;
    }

    if (!date) {
      toast.error("Date is required");
      return;
    }

    await addIncome({ source, amount, date, icon });

    setOpenAddIncomeModal(false);
  };

  // ================= HANDLE DELETE =================
  const handleDeleteIncome = async (id) => {
    await deleteIncome(id);
    setOpenDeleteAlert({ show: false, data: null });
  };

  return (
    <Dashboardlayout activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">

          {/* ================= OVERVIEW ================= */}
          <IncomeOverview
            transactions={incomes}
            onAddIncome={() => setOpenAddIncomeModal(true)}
          />

          {/* ================= LIST ================= */}
          <IncomeList
            transactions={incomes}
            onDelete={(id) =>
              setOpenDeleteAlert({ show: true, data: id })
            }
            onDownLoad={downloadIncomeExcel}
            loading={isFetchingIncome}
          />

        </div>

        {/* ================= ADD MODAL ================= */}
        <Modal
          isOpen={openAddIncomeModal}
          onClose={() => setOpenAddIncomeModal(false)}
          title="Add Income"
        >
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Modal>

        {/* ================= DELETE MODAL ================= */}
        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() =>
            setOpenDeleteAlert({ show: false, data: null })
          }
          title="Delete Income"
        >
          <DeleteAlert
            content="Are you sure you want to delete this income detail?"
            onDelete={() =>
              handleDeleteIncome(openDeleteAlert.data)
            }
          />
        </Modal>
      </div>
    </Dashboardlayout>
  );
};

export default Income;