import React, { useState, useRef, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format, parse, isValid, isAfter } from "date-fns";
import { Calendar } from "lucide-react";
import EmojiPickerPopup from "../layouts/EmojiPickerPopup";

const AddIncomeForm = ({ onAddIncome }) => {
  const [income, setIncome] = useState({
    source: "",
    amount: "",
    date: "",
    icon: "",
  });

  const [errors, setErrors] = useState({
    source: "",
    amount: "",
    date: "",
  });

  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarPosition, setCalendarPosition] = useState({
    top: 0,
    left: 0,
  });

  const inputRef = useRef(null);
  const calendarRef = useRef(null);
  const today = new Date();

  const handleChange = (key, value) => {
    setIncome((prev) => ({ ...prev, [key]: value }));

    // Clear error when user types
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  // ===== Smart Floating Position =====
  const openCalendar = () => {
    if (!inputRef.current) return;

    const rect = inputRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const openUpward = spaceBelow < 320;

    setCalendarPosition({
      top: openUpward
        ? rect.top + window.scrollY - 320 - 8
        : rect.bottom + window.scrollY + 8,
      left: rect.left + window.scrollX,
    });

    setShowCalendar(true);
  };

  // ===== Close On Outside Click =====
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(e.target) &&
        !inputRef.current.contains(e.target)
      ) {
        setShowCalendar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ===== Recalculate On Scroll =====
  useEffect(() => {
    const handleScroll = () => {
      if (showCalendar) openCalendar();
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showCalendar]);

  // ===== Date Validation =====
  const validateDate = (dateObj) => {
    if (!dateObj) {
      setErrors((prev) => ({ ...prev, date: "Date is required" }));
      return false;
    }

    if (!isValid(dateObj)) {
      setErrors((prev) => ({ ...prev, date: "Invalid date" }));
      return false;
    }

    if (isAfter(dateObj, today)) {
      setErrors((prev) => ({
        ...prev,
        date: "Future dates are not allowed",
      }));
      return false;
    }

    setErrors((prev) => ({ ...prev, date: "" }));
    return true;
  };

  const handleManualDateInput = (value) => {
    handleChange("date", value);

    if (!value) {
      setErrors((prev) => ({ ...prev, date: "Date is required" }));
      return;
    }

    const parsed = parse(value, "dd-MM-yyyy", new Date());

    if (!isValid(parsed)) {
      setErrors((prev) => ({
        ...prev,
        date: "Invalid format (dd-MM-yyyy)",
      }));
      return;
    }

    validateDate(parsed);
  };

  // ===== Full Form Validation =====
  const validateForm = () => {
    let newErrors = {
      source: "",
      amount: "",
      date: "",
    };

    let isValidForm = true;

    if (!income.source.trim()) {
      newErrors.source = "Income source is required";
      isValidForm = false;
    }

    if (!income.amount || Number(income.amount) <= 0) {
      newErrors.amount = "Valid amount is required";
      isValidForm = false;
    }

    if (!income.date) {
      newErrors.date = "Date is required";
      isValidForm = false;
    } else {
      const parsed = parse(income.date, "dd-MM-yyyy", new Date());
      if (!validateDate(parsed)) {
        isValidForm = false;
      }
    }

    setErrors(newErrors);
    return isValidForm;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const parsed = parse(income.date, "dd-MM-yyyy", new Date());

    onAddIncome({
      ...income,
      amount: Number(income.amount),
      date: parsed.toISOString(),
    });

    // Reset form after submit
    setIncome({
      source: "",
      amount: "",
      date: "",
      icon: "",
    });
  };

  return (
    <div className="space-y-6">
      <EmojiPickerPopup
        icon={income.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />

      {/* Income Source */}
      <div>
        <label className="text-sm text-gray-400">Income Source *</label>
        <input
          type="text"
          value={income.source}
          onChange={(e) => handleChange("source", e.target.value)}
          placeholder="Freelance, Salary..."
          className="w-full mt-2 px-4 py-3 rounded-xl bg-white/[0.05]
            border border-white/[0.08] text-white placeholder-gray-500
            backdrop-blur-md focus:outline-none focus:border-white/[0.2]"
        />
        {errors.source && (
          <p className="text-red-400 text-xs mt-2">{errors.source}</p>
        )}
      </div>

      {/* Amount */}
      <div>
        <label className="text-sm text-gray-400">Amount *</label>
        <input
          type="number"
          min="0"
          value={income.amount}
          onChange={(e) => handleChange("amount", e.target.value)}
          className="w-full mt-2 px-4 py-3 rounded-xl bg-white/[0.05]
            border border-white/[0.08] text-white backdrop-blur-md
            focus:outline-none focus:border-white/[0.2]"
        />
        {errors.amount && (
          <p className="text-red-400 text-xs mt-2">{errors.amount}</p>
        )}
      </div>

      {/* Date */}
      <div>
        <label className="text-sm text-gray-400">Date *</label>

        <div ref={inputRef} className="relative mt-2">
          <input
            type="text"
            value={income.date}
            onChange={(e) => handleManualDateInput(e.target.value)}
            placeholder="dd-MM-yyyy"
            className="w-full px-4 py-3 pr-10 rounded-xl
              bg-white/[0.05] border border-white/[0.08]
              text-white backdrop-blur-xl
              focus:outline-none focus:border-white/[0.2]"
          />

          <Calendar
            size={18}
            onClick={openCalendar}
            className="absolute right-3 top-1/2 -translate-y-1/2
              text-gray-400 cursor-pointer hover:text-white"
          />
        </div>

        {errors.date && (
          <p className="text-red-400 text-xs mt-2">{errors.date}</p>
        )}
      </div>

      {/* Floating Calendar */}
      {showCalendar && (
        <div
          ref={calendarRef}
          style={{
            position: "fixed",
            top: calendarPosition.top,
            left: calendarPosition.left,
          }}
          className="z-[9999] w-[340px] rounded-3xl
            bg-white/[0.10]
            border border-white/[0.18]
            backdrop-blur-3xl
            shadow-[0_30px_90px_rgba(0,0,0,0.75)]
            px-6 py-5"
        >
          <DayPicker
            mode="single"
            selected={
              income.date
                ? parse(income.date, "dd-MM-yyyy", new Date())
                : undefined
            }
            onSelect={(date) => {
              if (!date) return;
              if (!validateDate(date)) return;

              handleChange("date", format(date, "dd-MM-yyyy"));
              setShowCalendar(false);
            }}
            disabled={{ after: today }}
          />
        </div>
      )}

      {/* Submit */}
      <div className="flex justify-end pt-4">
        <button
          onClick={handleSubmit}
          className="px-6 py-2.5 rounded-xl
            bg-white/[0.08] border border-white/[0.15]
            text-amber-300 font-medium backdrop-blur-md
            hover:bg-white/[0.12]
            active:scale-[0.97]
            transition"
        >
          Add Income
        </button>
      </div>
    </div>
  );
};

export default AddIncomeForm;