import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Loader } from "lucide-react";

import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";

import Home from "./pages/Dashboard/Home";
import Income from "./pages/Dashboard/Income";
import Expense from "./pages/Dashboard/Expense";
import BudgetCycle from "./pages/Dashboard/BudgetCycle";
import BudgetCycleDetails from "./pages/Dashboard/BudgetCycleDetails";

import { useAuthStore } from "./store/useAuthStore";

const App = () => {
  const {
    authUser,
    isCheckingAuth,
    checkAuth,
  } = useAuthStore();

  // ✅ Check authentication when app loads
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // ✅ Show loader while checking auth
  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <Routes>
        {/* Root Route */}
        <Route
          path="/"
          element={
            authUser ? (
              <Navigate to="/dashboard" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Auth Routes */}
        <Route
          path="/login"
          element={
            !authUser ? <Login /> : <Navigate to="/dashboard" />
          }
        />
        <Route
          path="/signup"
          element={
            !authUser ? <Signup /> : <Navigate to="/dashboard" />
          }
        />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            authUser ? <Home /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/income"
          element={
            authUser ? <Income /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/expense"
          element={
            authUser ? <Expense /> : <Navigate to="/login" />
          }
        />

        {/* Budget Cycle Routes */}
          <Route
            path="/budgetCycle"
            element={
              authUser ? <BudgetCycle /> : <Navigate to="/login" />
            }
          />

          <Route
            path="/budgetCycle/:id"
            element={
              authUser ? <BudgetCycleDetails />  : <Navigate to="/login" />
            }
          />
      </Routes>

     <Toaster
  position="top-center"
  toastOptions={{
    style: {
      background: "transparent",
      boxShadow: "none",
      padding: 0,
    },
  }}/>
  
    </div>
  );
};

export default App;