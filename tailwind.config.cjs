/** @type {import('tailwindcss').Config} */

const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          25: "#f2e8ff",
          50: "#e5d2ff",
          100: "#c9a6ff",
          200: "#ad79ff",
          300: "#a14dff",
          400: "#963aff",
          500: "#8b28ff",
          600: "#9147ff",
          700: "#7c3fff",
          800: "#6738ff",
          900: "#5230ff",
        },
        warning: {
          25: "#fffcf5",
          50: "#fffaeb",
          100: "#fef0c7",
          200: "#fedf89",
          300: "#fec84b",
          400: "#fdb022",
          500: "#f79009",
          600: "#dc6803",
          700: "#b54708",
          800: "#93370d",
          900: "#7a2e0e",
        },
        success: {
          25: "#f6fef9",
          50: "#ecfdf3",
          100: "#d1fadf",
          200: "#a6f4c5",
          300: "#6ce9a6",
          400: "#32d583",
          500: "#12b76a",
          600: "#039855",
          700: "#027a48",
          800: "#05603a",
          900: "#054f31",
        },
        fontFamily: { inter: "Inter" },
      },
    },
    plugins: [require("@tailwindcss/forms")],
  },
};

module.exports = config;
