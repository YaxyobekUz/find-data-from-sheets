/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: { default: "#0085FF", strong: "#1A3EDD" },
        neutral: { dark: "#333333" },
        gray: { light: "#f5f5f5", medium: "#d1d5db" },
      },

      fontFamily: {
        Inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};