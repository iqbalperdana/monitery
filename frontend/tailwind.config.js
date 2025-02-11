/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#2563eb",
          dark: "#3b82f6",
        },
        secondary: {
          light: "#e5e7eb",
          dark: "#374151",
        },
      },
    },
  },
  plugins: [],
};
