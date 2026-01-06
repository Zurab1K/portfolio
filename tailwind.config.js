/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
  extend: {
    fontFamily: {
      sans: ["Helvetica Now", "Inter", "sans-serif"],
      serif: ["Playfair Display", "serif"],
    },
  },
},

  plugins: [],
}
