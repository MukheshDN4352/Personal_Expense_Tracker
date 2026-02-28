import React, { useState, useRef } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { validateEmail } from "../../utils/helper.js";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector.jsx";
import { Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";

const Signup = () => {
  const navigate = useNavigate();

  const { sendOtp, verifyOtp, isSendingOtp, isVerifyingOtp } =
    useAuthStore();

  // ================= STATES =================
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  // OTP state
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
      await sendOtp({ fullName, email, password });
      setOtpSent(true);
    } catch (err) {
      setError("Failed to send OTP "+err);
    }
  };

  // ================= OTP HANDLING =================
  const handleOtpChange = (element, index) => {
    if (!/^[0-9]?$/.test(element.value)) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Move to next
    if (element.value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Backspace move to previous
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

    inputsRef.current[5].focus();
  };

  // ================= VERIFY OTP =================
  const handleVerifyOtp = async () => {
    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6)
      return setError("Please enter complete OTP");

    setError("");

    try {
      await verifyOtp({
        email,
        otp: enteredOtp,
        password,
      });

      navigate("/dashboard");
    } catch (err) {
      setError("Invalid OTP. Please try again.");
    }
  };

  return (
    <AuthLayout>
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg glass p-8"
      >
        <h3 className="text-2xl font-semibold text-slate-100 text-center">
          Create Account
        </h3>

        <form className="space-y-6">

          {/* Profile Photo */}
          {/* <div className="flex justify-center">
            <ProfilePhotoSelector
              image={profilePic}
              setImage={setProfilePic}
            />
          </div> */}

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

          {/* SEND OTP BUTTON */}
          {!otpSent && (
<motion.button
  whileTap={{ scale: 0.96 }}
  type="button"
  onClick={handleSendOtp}
  onMouseMove={(e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--x", `${x}px`);
    e.currentTarget.style.setProperty("--y", `${y}px`);
  }}
  disabled={isSendingOtp}
  className="
    liquid-glass-btn
    liquid-blue
    w-full
    py-3
  "
>
  {isSendingOtp ? "Sending OTP..." : "Send OTP"}
</motion.button>
          )}

          {/* OTP SECTION */}
          {otpSent && (
            <>
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
                    ref={(el) => (inputsRef.current[index] = el)}
                    onChange={(e) =>
                      handleOtpChange(e.target, index)
                    }
                    onKeyDown={(e) =>
                      handleKeyDown(e, index)
                    }
                    className="w-12 h-12 text-center text-xl rounded-lg bg-slate-800 text-white"
                  />
                ))}
              </div>

      <motion.button
  whileTap={{ scale: 0.96 }}
  type="button"
  onClick={handleVerifyOtp}
  onMouseMove={(e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--x", `${x}px`);
    e.currentTarget.style.setProperty("--y", `${y}px`);
  }}
  disabled={isVerifyingOtp}
  className="
    liquid-glass-btn
    liquid-green
    w-full
    py-3
  "
>
  {isVerifyingOtp ? "Verifying..." : "Verify OTP"}
</motion.button>
            </>
          )}

          {error && (
            <p className="text-red-400 text-sm">
              {error}
            </p>
          )}

          <p className="text-sm text-slate-300 text-center mt-6">
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