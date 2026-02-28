import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import showGlassToast from "../components/layouts/Notification";

const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000"
    : "/";

export const useBudgetCycleStore = create((set, get) => ({
  // ================= STATE =================
  budgetCycles: [],
  selectedBudgetCycle: null,

  // Loading states
  isCreatingBudgetCycle: false,
  isFetchingBudgetCycles: false,
  isFetchingSingleBudgetCycle: false,
  isDeletingBudgetCycle: false,
  isDownloadingBudgetCycle: false,

  // ================= CREATE BUDGET CYCLE =================
  createBudgetCycle: async (data) => {
    set({ isCreatingBudgetCycle: true });

    try {
      const res = await axiosInstance.post(
        "/budgetCycle/create",
        data
      );

      set({
        budgetCycles: [...get().budgetCycles, res.data],
      });

      showGlassToast(
        res.data.message || "Budget Cycle created successfully",
        "success"
      );

      return res.data;
    } catch (error) {
      showGlassToast(
        error.response?.data?.message ||
          "Failed to create Budget Cycle",
        "error"
      );
    } finally {
      set({ isCreatingBudgetCycle: false });
    }
  },

  // ================= GET ALL BUDGET CYCLES =================
  getAllBudgetCycles: async () => {
    set({ isFetchingBudgetCycles: true });

    try {
      const res = await axiosInstance.get(
        "/budgetCycle/getAll"
      );

      set({ budgetCycles: res.data });
    } catch (error) {
      showGlassToast(
        error.response?.data?.message ||
          "Failed to fetch Budget Cycles",
        "error"
      );
    } finally {
      set({ isFetchingBudgetCycles: false });
    }
  },

  // ================= GET SINGLE BUDGET CYCLE =================
  getBudgetCycleById: async (id) => {
    set({ isFetchingSingleBudgetCycle: true });

    try {
      const res = await axiosInstance.get(
        `/budgetCycle/get/${id}`
      );

      set({ selectedBudgetCycle: res.data });

      return res.data;
    } catch (error) {
      showGlassToast(
        error.response?.data?.message ||
          "Failed to fetch Budget Cycle",
        "error"
      );
    } finally {
      set({ isFetchingSingleBudgetCycle: false });
    }
  },

  // ================= DELETE BUDGET CYCLE =================
  deleteBudgetCycle: async (id) => {
    set({ isDeletingBudgetCycle: true });

    try {
      await axiosInstance.delete(`/budgetCycle/${id}`);

      set({
        budgetCycles: get().budgetCycles.filter(
          (cycle) => cycle._id !== id
        ),
        selectedBudgetCycle:
          get().selectedBudgetCycle?.budgetCycle?._id === id
            ? null
            : get().selectedBudgetCycle,
      });

      showGlassToast(
        "Budget Cycle deleted successfully",
        "success"
      );
    } catch (error) {
      showGlassToast(
        error.response?.data?.message ||
          "Failed to delete Budget Cycle",
        "error"
      );
    } finally {
      set({ isDeletingBudgetCycle: false });
    }
  },

  // ================= DOWNLOAD BUDGET CYCLE =================
  downloadBudgetCycle: async (id) => {
    set({ isDownloadingBudgetCycle: true });

    try {
      const res = await axiosInstance.get(
        `/budgetCycle/download/${id}`,
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(
        new Blob([res.data])
      );

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `budget-cycle-${id}.xlsx`
      );
      document.body.appendChild(link);
      link.click();
      link.remove();

      showGlassToast(
        "Budget Cycle downloaded successfully",
        "success"
      );
    } catch (error) {
      showGlassToast(
        error.response?.data?.message ||
          "Download failed",
        "error"
      );
    } finally {
      set({ isDownloadingBudgetCycle: false });
    }
  },

  // ================= CLEAR SELECTED =================
  clearSelectedBudgetCycle: () => {
    set({ selectedBudgetCycle: null });
  },
}));