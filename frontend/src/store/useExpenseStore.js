import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import showGlassToast from "../components/layouts/Notification";
const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000"
    : "/";

export const useExpenseStore = create((set, get) => ({
  // ================= STATE =================
  expenses: [],

  // Loading states
  isAddingExpense: false,
  isFetchingExpense: false,
  isDeletingExpense: false,
  isDownloadingExpense: false,

  // ================= ADD EXPENSE =================
  addExpense: async (data) => {
    set({ isAddingExpense: true });

    try {
      const res = await axiosInstance.post(
        "/expense/add",
        data
      );

      // Update state immediately
      set({ expenses: [...get().expenses, res.data] });

      showGlassToast(
        res.data.message || "Expense added successfully",
        "success"
      );
    } catch (error) {
      showGlassToast(
        error.response?.data?.message ||
          "Failed to add expense",
        "error"
      );
    } finally {
      set({ isAddingExpense: false });
    }
  },

  // ================= GET ALL EXPENSE =================
  getAllExpense: async () => {
    set({ isFetchingExpense: true });

    try {
      const res = await axiosInstance.get(
        "/expense/get"
      );

      set({ expenses: res.data });
    } catch (error) {
      showGlassToast(
        error.response?.data?.message ||
          "Failed to fetch expenses",
        "error"
      );
    } finally {
      set({ isFetchingExpense: false });
    }
  },

  // ================= DELETE EXPENSE =================
  deleteExpense: async (expenseId) => {
    set({ isDeletingExpense: true });

    try {
      await axiosInstance.delete(
        `/expense/${expenseId}`
      );

      // Remove deleted expense from state
      set({
        expenses: get().expenses.filter(
          (expense) => expense._id !== expenseId
        ),
      });

      showGlassToast(
        "Expense deleted successfully",
        "success"
      );
    } catch (error) {
      showGlassToast(
        error.response?.data?.message ||
          "Failed to delete expense",
        "error"
      );
    } finally {
      set({ isDeletingExpense: false });
    }
  },

  // ================= DOWNLOAD EXPENSE EXCEL =================
  downloadExpenseExcel: async () => {
    set({ isDownloadingExpense: true });

    try {
      const res = await axiosInstance.get(
        "/expense/downloadexcel",
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(
        new Blob([res.data])
      );

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "expense.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();

      showGlassToast(
        "Expense file downloaded successfully",
        "success"
      );
    } catch (error) {
      showGlassToast(
        error.response?.data?.message ||
          "Download failed",
        "error"
      );
    } finally {
      set({ isDownloadingExpense: false });
    }
  },
}));