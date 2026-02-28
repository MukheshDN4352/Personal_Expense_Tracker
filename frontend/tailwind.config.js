import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      borderRadius: {
        "2xl": "1.25rem",
      },

      boxShadow: {
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
        soft: "0 4px 20px rgba(0,0,0,0.25)",
      },

      backdropBlur: {
        xs: "2px",
      },

      colors: {
        bgPrimary: "#0f172a",
        glass: "rgba(255,255,255,0.06)",
        glassBorder: "rgba(255,255,255,0.12)",
        textPrimary: "#f8fafc",
        textSecondary: "#94a3b8",
        income: "#10b981",
        expense: "#f43f5e",
        accent: "#3b82f6",
      },
    },
  },

  plugins: [daisyui],

  daisyui: {
    themes: false, // VERY IMPORTANT → disables bright default themes
  },
};


@keyframes fadeIn {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fadeIn {
  animation: fadeIn 0.2s ease-out;
}