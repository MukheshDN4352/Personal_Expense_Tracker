import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import showGlassToast from "../components/layouts/Notification";

const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000"
    : "/";

export const useIncomeStore = create((set, get) => ({
  // ================= STATE =================
  incomes: [],

  // Loading states
  isAddingIncome: false,
  isFetchingIncome: false,
  isDeletingIncome: false,
  isDownloadingIncome: false,

  // ================= ADD INCOME =================
  addIncome: async (data) => {
    set({ isAddingIncome: true });

    try {
      const res = await axiosInstance.post("/income/add", data);

      // Update state immediately
      set({ incomes: [...get().incomes, res.data] });

      showGlassToast(
        res.data.message || "Income added successfully",
        "success"
      );
    } catch (error) {
      showGlassToast(
        error.response?.data?.message ||
          "Failed to add income",
        "error"
      );
    } finally {
      set({ isAddingIncome: false });
    }
  },

  // ================= GET ALL INCOME =================
  getAllIncome: async () => {
    set({ isFetchingIncome: true });

    try {
      const res = await axiosInstance.get("/income/get");
      set({ incomes: res.data });
    } catch (error) {
      showGlassToast(
        error.response?.data?.message ||
          "Failed to fetch income",
        "error"
      );
    } finally {
      set({ isFetchingIncome: false });
    }
  },

  // ================= DELETE INCOME =================
  deleteIncome: async (incomeId) => {
    set({ isDeletingIncome: true });

    try {
      await axiosInstance.delete(`/income/${incomeId}`);

      // Remove deleted income from state
      set({
        incomes: get().incomes.filter(
          (income) => income._id !== incomeId
        ),
      });

      showGlassToast(
        "Income deleted successfully",
        "success"
      );
    } catch (error) {
      showGlassToast(
        error.response?.data?.message ||
          "Failed to delete income",
        "error"
      );
    } finally {
      set({ isDeletingIncome: false });
    }
  },

  // ================= DOWNLOAD INCOME EXCEL =================
  downloadIncomeExcel: async () => {
    set({ isDownloadingIncome: true });

    try {
      const res = await axiosInstance.get(
        "/income/downloadexcel",
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(
        new Blob([res.data])
      );

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "income.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();

      showGlassToast(
        "Income file downloaded successfully",
        "success"
      );
    } catch (error) {
      showGlassToast(
        error.response?.data?.message ||
          "Download failed",
        "error"
      );
    } finally {
      set({ isDownloadingIncome: false });
    }
  },
}));