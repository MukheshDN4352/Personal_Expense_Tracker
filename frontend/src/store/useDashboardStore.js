import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import showGlassToast from "../components/layouts/Notification";

const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000"
    : "/";

export const useDashboardStore = create((set) => ({
  dashboardData: null,
  isLoadingDashboard: false,

  // ================= GET DASHBOARD DATA =================
  getDashboardData: async () => {
    set({ isLoadingDashboard: true });

    try {
      const res = await axiosInstance.get("/dashboard");
      set({ dashboardData: res.data });
    } catch (error) {
      showGlassToast(
        error.response?.data?.message ||
          "Failed to fetch dashboard data",
        "error"
      );
    } finally {
      set({ isLoadingDashboard: false });
    }
  },
}));