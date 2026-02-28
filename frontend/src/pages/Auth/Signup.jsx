import React, { useState, useRef } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { validateEmail } from "../../utils/helper.js";
import { Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";

const Signup = () => {
  const navigate = useNavigate();
  const { sendOtp, verifyOtp, isSendingOtp, isVerifyingOtp } =
    useAuthStore();

  // ================= STATES =================
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputsRef = useRef([]);

  // ================= SEND OTP =================
  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (!fullName) return setError("Full name is required");
    if (!validateEmail(email))
      return setError("Enter a valid email");
    if (!password) return setError("Password is required");

    setError("");

    try {
      const res = await sendOtp({ fullName, email, password });

      // Only open OTP section if success
      if (res?.success) {
        setOtpSent(true);
      }
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "User already exists"
      );
      setOtpSent(false); // Prevent OTP section opening
    }
  };

  // ================= OTP INPUT =================
  const handleOtpChange = (element, index) => {
    if (!/^[0-9]?$/.test(element.value)) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData("text").trim();
    if (!/^\d{6}$/.test(pasteData)) return;

    const newOtp = pasteData.split("");
    setOtp(newOtp);

    newOtp.forEach((digit, index) => {
      inputsRef.current[index].value = digit;
    });
  };

  // ================= VERIFY OTP =================
  const handleVerifyOtp = async () => {
    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6)
      return setError("Please enter complete OTP");

    setError("");

    try {
      const res = await verifyOtp({
        email,
        otp: enteredOtp,
        password,
      });

      if (res?.success) {
        navigate("/dashboard");
      }
    } catch (err) {
      // Stay on same page
      setError("Invalid OTP. Please re-enter.");
      setOtp(new Array(6).fill(""));
      inputsRef.current[0]?.focus();
    }
  };

  return (
    <AuthLayout>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg glass p-8 space-y-6"
      >
        <h3 className="text-2xl font-semibold text-slate-100 text-center">
          Create Account
        </h3>

        {/* ================= FORM ================= */}
        <form className="space-y-6">

          {/* Full Name */}
          <div>
            <label className="text-sm text-slate-300">
              Full Name
            </label>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="input-liquid mt-2"
              disabled={otpSent}
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-slate-300">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="input-liquid mt-2"
              disabled={otpSent}
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
                type={showPassword ? "text" : "password"}
                className="input-liquid pr-12"
                disabled={otpSent}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>

          {/* SEND OTP */}
          {!otpSent && (
            <motion.button
              whileTap={{ scale: 0.96 }}
              type="button"
              onClick={handleSendOtp}
              disabled={isSendingOtp}
              className="liquid-glass-btn liquid-blue w-full py-3"
            >
              {isSendingOtp
                ? "Sending OTP..."
                : "Send OTP"}
            </motion.button>
          )}

          {/* OTP SECTION */}
          {otpSent && (
            <div className="space-y-6 pt-4">
              <div
                className="flex justify-between gap-2"
                onPaste={handlePaste}
              >
                {otp.map((data, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    value={data}
                    ref={(el) =>
                      (inputsRef.current[index] = el)
                    }
                    onChange={(e) =>
                      handleOtpChange(e.target, index)
                    }
                    onKeyDown={(e) =>
                      handleKeyDown(e, index)
                    }
                    className="w-12 h-12 text-center text-xl rounded-lg bg-slate-800 text-white border border-slate-700 focus:border-blue-400 outline-none"
                  />
                ))}
              </div>

              <motion.button
                whileTap={{ scale: 0.96 }}
                type="button"
                onClick={handleVerifyOtp}
                disabled={isVerifyingOtp}
                className="liquid-glass-btn liquid-green w-full py-3"
              >
                {isVerifyingOtp
                  ? "Verifying..."
                  : "Verify OTP"}
              </motion.button>
            </div>
          )}

          {error && (
            <p className="text-red-400 text-sm text-center">
              {error}
            </p>
          )}

          <p className="text-sm text-slate-300 text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-400"
            >
              Login
            </Link>
          </p>
        </form>
      </motion.div>
    </AuthLayout>
  );
};

export default Signup;