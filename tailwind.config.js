/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#AA96DA",
        secondary: "#FFFFD2",
        bl:'rgba(0, 0, 0, 0.5)',
      },
      screens: {
        sm: "450px",
        md: "768px",
        lg: "1350px",
      },
      fontFamily: {
        custom: ["Satoshi", "sans-serif"],
      },
    },
  },
  plugins: [],
}