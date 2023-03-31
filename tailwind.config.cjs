/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "rgba(0,0,0,0.1)",
          100: "rgba(0,0,0,0.3)",
          300: "rgba(0,0,0,0.5)",
          500: "rgba(0,0,0,1)",
        },
        secondary: "#FFFFFF",
        warning: "#FF3434",
        success: "#3B9F57",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
