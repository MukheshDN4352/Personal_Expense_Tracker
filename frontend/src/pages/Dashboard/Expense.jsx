import React, { useEffect, useState } from "react";
import Dashboardlayout from "../../components/layouts/DashboardLayout";
import ExpenseOverview from "../../components/Expense/ExpenseOverview";
import ExpenseList from "../../components/Expense/ExpenseList";
import Modal from "../../components/Modal";
import AddExpenseForm from "../../components/Expense/AddExpenseForm";
import DeleteAlert from "../../components/layouts/DeleteAlert";
import toast from "react-hot-toast";

import { useExpenseStore } from "../../store/useExpenseStore";
import { useAuthStore } from "../../store/useAuthStore";

const Expense = () => {
  // ================= AUTH STORE =================
  const { checkAuth } = useAuthStore();

  // ================= EXPENSE STORE =================
  const {
    expenses,
    addExpense,
    getAllExpense,
    deleteExpense,
    downloadExpenseExcel,
    isFetchingExpense,
  } = useExpenseStore();

  // ================= LOCAL UI STATE =================
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  // ================= CHECK AUTH + FETCH DATA =================
  useEffect(() => {
    checkAuth();
    getAllExpense();
  }, []);

  // ================= HANDLE ADD EXPENSE =================
  const handleAddExpense = async (expense) => {
    const { category, amount, date, icon } = expense;

    if (!category.trim()) {
      toast.error("Category is required");
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

    await addExpense({ category, amount, date, icon });

    setOpenAddExpenseModal(false);
  };

  // ================= HANDLE DELETE =================
  const handleDeleteExpense = async (id) => {
    await deleteExpense(id);
    setOpenDeleteAlert({ show: false, data: null });
  };

  return (
    <Dashboardlayout activeMenu="Expense">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">

          {/* ================= OVERVIEW ================= */}
          <ExpenseOverview
            transactions={expenses}
            onAddExpense={() => setOpenAddExpenseModal(true)}
          />

          {/* ================= LIST ================= */}
          <ExpenseList
            transactions={expenses}
            onDelete={(id) =>
              setOpenDeleteAlert({ show: true, data: id })
            }
            onDownLoad={downloadExpenseExcel}
            loading={isFetchingExpense}
          />

        </div>

        {/* ================= ADD MODAL ================= */}
        <Modal
          isOpen={openAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title="Add Expense"
        >
          <AddExpenseForm onAddExpense={handleAddExpense} />
        </Modal>

        {/* ================= DELETE MODAL ================= */}
        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() =>
            setOpenDeleteAlert({ show: false, data: null })
          }
          title="Delete Expense"
        >
          <DeleteAlert
            content="Are you sure you want to delete this expense detail?"
            onDelete={() =>
              handleDeleteExpense(openDeleteAlert.data)
            }
          />
        </Modal>
      </div>
    </Dashboardlayout>
  );
};

export default Expense;