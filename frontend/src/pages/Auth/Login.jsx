import React, { useState, useEffect } from "react";
import AuthLayout from "../../components/layouts/AuthLayout.jsx";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { validateEmail } from "../../utils/helper.js";
import { Eye, EyeOff } from "lucide-react";

import { useAuthStore } from "../../store/useAuthStore";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  // ✅ Zustand Store
  const { login, isLoggingIn, authUser } = useAuthStore();

  // ✅ If user logs in successfully → redirect
  useEffect(() => {
    if (authUser) {
      navigate("/dashboard");
    }
  }, [authUser, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter the password.");
      return;
    }

    setError(null);

    // ✅ Call Zustand login
    await login({ email, password });
  };

  return (
    <AuthLayout>
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md glass p-8"
      >
        <h3 className="text-2xl font-semibold text-slate-100">
          Welcome Back
        </h3>

        <p className="text-slate-300 text-sm mt-2 mb-8">
          Please enter your details to log in
        </p>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <div>
            <label className="text-sm text-slate-300">
              Email Address
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@gmail.com"
              type="email"
              className="input-liquid mt-2 text-slate-100 placeholder:text-slate-400"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-slate-300">
              Password
            </label>

            <div className="relative mt-2">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                type={showPassword ? "text" : "password"}
                className="input-liquid pr-12 text-slate-100 placeholder:text-slate-400"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-400 transition-colors duration-300"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-rose-400 text-sm">{error}</p>
          )}

         <motion.button
  whileTap={{ scale: 0.96 }}
  type="submit"
  onMouseMove={(e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--x", `${x}px`);
    e.currentTarget.style.setProperty("--y", `${y}px`);
  }}
  disabled={isLoggingIn}
  className="
    liquid-glass-btn
    liquid-blue
    w-full
    py-3
  "
>
  {isLoggingIn ? "Logging in..." : "Login"}
</motion.button>

          <p className="text-sm text-slate-300 mt-6">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              Signup
            </Link>
          </p>
        </form>
      </motion.div>
    </AuthLayout>
  );
};

export default Login;