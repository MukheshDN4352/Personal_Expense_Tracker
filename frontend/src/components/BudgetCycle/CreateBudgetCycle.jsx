import React, { useState, useRef, useEffect } from "react";
import { useBudgetCycleStore } from "../../store/useBudgetCycleStore";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import {
  format,
  parse,
  isValid,
  differenceInDays,
  isAfter,
} from "date-fns";
import { Calendar } from "lucide-react";

const CreateBudgetCycle = ({ onSuccess }) => {
  const { createBudgetCycle, isCreatingBudgetCycle } =
    useBudgetCycleStore();

  const [form, setForm] = useState({
    name: "",
    upperLimitAmount: "",
    startDate: "",
    endDate: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    upperLimitAmount: "",
    startDate: "",
    endDate: "",
  });

  const [activeCalendar, setActiveCalendar] = useState(null);
  const [calendarPosition, setCalendarPosition] = useState({
    top: 0,
    left: 0,
  });

  const inputRefs = {
    startDate: useRef(null),
    endDate: useRef(null),
  };

  const calendarRef = useRef(null);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" })); // clear field error
  };

  // ===== Open Calendar =====
  const openCalendar = (field) => {
    const ref = inputRefs[field];
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const openUpward = spaceBelow < 350;

    setCalendarPosition({
      top: openUpward
        ? rect.top + window.scrollY - 350
        : rect.bottom + window.scrollY + 8,
      left: rect.left + window.scrollX,
    });

    setActiveCalendar(field);
  };

  // ===== Close Calendar =====
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(e.target)
      ) {
        setActiveCalendar(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ===== Full Validation =====
  const validateForm = () => {
    let newErrors = {
      name: "",
      upperLimitAmount: "",
      startDate: "",
      endDate: "",
    };

    let isValidForm = true;

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
      isValidForm = false;
    }

    if (!form.upperLimitAmount || Number(form.upperLimitAmount) <= 0) {
      newErrors.upperLimitAmount = "Valid upper limit amount is required";
      isValidForm = false;
    }

    if (!form.startDate) {
      newErrors.startDate = "Start date is required";
      isValidForm = false;
    }

    if (!form.endDate) {
      newErrors.endDate = "End date is required";
      isValidForm = false;
    }

    if (form.startDate && form.endDate) {
      const start = parse(form.startDate, "dd-MM-yyyy", new Date());
      const end = parse(form.endDate, "dd-MM-yyyy", new Date());

      if (!isValid(start)) {
        newErrors.startDate = "Invalid format (dd-MM-yyyy)";
        isValidForm = false;
      }

      if (!isValid(end)) {
        newErrors.endDate = "Invalid format (dd-MM-yyyy)";
        isValidForm = false;
      }

      if (isValid(start) && isValid(end)) {
        if (isAfter(start, end)) {
          newErrors.startDate = "Start date must be before end date";
          isValidForm = false;
        }

        const diff = differenceInDays(end, start);
        if (diff < 25) {
          newErrors.endDate =
            "Budget cycle must be at least 25 days";
          isValidForm = false;
        }
      }
    }

    setErrors(newErrors);
    return isValidForm;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const res = await createBudgetCycle({
      ...form,
      upperLimitAmount: Number(form.upperLimitAmount),
      startDate: parse(form.startDate, "dd-MM-yyyy", new Date()).toISOString(),
      endDate: parse(form.endDate, "dd-MM-yyyy", new Date()).toISOString(),
    });

    if (res) onSuccess();
  };

  return (
    <div className="space-y-6 text-white">

      {/* Name */}
      <div>
        <label className="text-sm text-gray-400">Name *</label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
          className="w-full mt-2 px-4 py-3 rounded-xl bg-white/[0.05]
            border border-white/[0.08] text-white backdrop-blur-md
            focus:outline-none focus:border-white/[0.2]"
        />
        {errors.name && (
          <p className="text-red-400 text-xs mt-2">{errors.name}</p>
        )}
      </div>

      {/* Upper Limit */}
      <div>
        <label className="text-sm text-gray-400">Upper Limit Amount *</label>
        <input
          type="number"
          value={form.upperLimitAmount}
          onChange={(e) =>
            handleChange("upperLimitAmount", e.target.value)
          }
          className="w-full mt-2 px-4 py-3 rounded-xl bg-white/[0.05]
            border border-white/[0.08] text-white backdrop-blur-md
            focus:outline-none focus:border-white/[0.2]"
        />
        {errors.upperLimitAmount && (
          <p className="text-red-400 text-xs mt-2">
            {errors.upperLimitAmount}
          </p>
        )}
      </div>

      {/* Start Date */}
      <div>
        <label className="text-sm text-gray-400">Start Date *</label>
        <div ref={inputRefs.startDate} className="relative mt-2">
          <input
            type="text"
            placeholder="dd-MM-yyyy"
            value={form.startDate}
            onChange={(e) =>
              handleChange("startDate", e.target.value)
            }
            className="w-full px-4 py-3 pr-10 rounded-xl
              bg-white/[0.05] border border-white/[0.08]
              text-white backdrop-blur-xl
              focus:outline-none focus:border-white/[0.2]"
          />
          <Calendar
            size={18}
            onClick={() => openCalendar("startDate")}
            className="absolute right-3 top-1/2 -translate-y-1/2
              text-gray-400 cursor-pointer hover:text-white"
          />
        </div>
        {errors.startDate && (
          <p className="text-red-400 text-xs mt-2">{errors.startDate}</p>
        )}
      </div>

      {/* End Date */}
      <div>
        <label className="text-sm text-gray-400">End Date *</label>
        <div ref={inputRefs.endDate} className="relative mt-2">
          <input
            type="text"
            placeholder="dd-MM-yyyy"
            value={form.endDate}
            onChange={(e) =>
              handleChange("endDate", e.target.value)
            }
            className="w-full px-4 py-3 pr-10 rounded-xl
              bg-white/[0.05] border border-white/[0.08]
              text-white backdrop-blur-xl
              focus:outline-none focus:border-white/[0.2]"
          />
          <Calendar
            size={18}
            onClick={() => openCalendar("endDate")}
            className="absolute right-3 top-1/2 -translate-y-1/2
              text-gray-400 cursor-pointer hover:text-white"
          />
        </div>
        {errors.endDate && (
          <p className="text-red-400 text-xs mt-2">{errors.endDate}</p>
        )}
      </div>

      {/* Overlay */}
      {activeCalendar && (
        <div
          className="fixed inset-0 z-[9998] bg-black/30 backdrop-blur-sm"
          onClick={() => setActiveCalendar(null)}
        />
      )}

      {/* Calendar */}
      {activeCalendar && (
        <div
          ref={calendarRef}
          style={{
            position: "fixed",
            top: calendarPosition.top,
            left: calendarPosition.left,
          }}
          className="z-[9999] w-[340px]
            rounded-3xl
            bg-gradient-to-br from-white/[0.08] to-white/[0.04]
            border border-white/[0.12]
            backdrop-blur-xl
            shadow-[0_20px_60px_rgba(0,0,0,0.55)]
            px-6 py-5"
        >
          <DayPicker
            mode="single"
            selected={
              form[activeCalendar]
                ? parse(form[activeCalendar], "dd-MM-yyyy", new Date())
                : undefined
            }
            onSelect={(date) => {
              if (!date) return;
              handleChange(
                activeCalendar,
                format(date, "dd-MM-yyyy")
              );
              setActiveCalendar(null);
            }}
          />
        </div>
      )}

      {/* Submit */}
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={isCreatingBudgetCycle}
          className="px-6 py-2.5 rounded-xl
            bg-white/[0.08] border border-white/[0.15]
            text-amber-300 hover:bg-white/[0.12]
            transition"
        >
          {isCreatingBudgetCycle ? "Creating..." : "Create"}
        </button>
      </div>
    </div>
  );
};

export default CreateBudgetCycle;