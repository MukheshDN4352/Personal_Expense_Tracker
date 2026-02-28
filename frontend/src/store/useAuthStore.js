import { create } from "zustand";
import { axiosInstance } from "../lib/axios";


import showGlassToast from "../components/layouts/Notification";





const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000"
    : "/";

export const useAuthStore = create((set) => ({
  authUser: null,

  // Loading states
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  isSendingOtp: false,
  isVerifyingOtp: false,

  onlineUsers: [],
  socket: null,

  // ================= CHECK AUTH =================
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      console.log(error.message);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  // ================= SEND OTP =================
  sendOtp: async (data) => {
    set({ isSendingOtp: true });
    try {
      const res = await axiosInstance.post("/auth/send-otp", data);
      

      showGlassToast(res.data.message || "OTP sent successfully", "success");
      return res.data;
    } catch (error) {
     showGlassToast(
  error.response?.data?.message || "Failed to send OTP",
  "error"
);
    } finally {
      set({ isSendingOtp: false });
    }
  },

  // ================= VERIFY OTP =================
  verifyOtp: async (data) => {
    set({ isVerifyingOtp: true });
    try {
      const res = await axiosInstance.post("/auth/verify-otp", data);

      // If backend returns user after verification
      set({ authUser: res.data.user || res.data });

  showGlassToast(
  res.data.message || "Account verified successfully",
  "success"
);
    } catch (error) {
          showGlassToast(
  error.response?.data?.message || "Failed to send OTP",
  "error"
);
    } finally {
      set({ isVerifyingOtp: false });
    }
  },

  // ================= LOGIN =================
  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
    showGlassToast("Logged in successfully", "success");
    } catch (error) {
        showGlassToast(
  error.response?.data?.message || "Failed to send OTP",
  "error"
);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  // ================= LOGOUT =================
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      showGlassToast("Logged out successfully", "success");
    } catch (error) {
           showGlassToast(
  error.response?.data?.message || "Failed to send OTP",
  "error"
);
    }
  },

  // ================= UPDATE PROFILE =================
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put(
        "/auth/update-profile",
        data
      );
      set({ authUser: res.data });
     showGlassToast("Profile updated successfully", "success");
    } catch (error) {
          showGlassToast(
  error.response?.data?.message || "Failed to send OTP",
  "error"
);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
}));