/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        surface: {
          DEFAULT: "rgb(var(--color-bg))",
          elevated: "rgb(var(--color-bg-elevated))",
          card: "rgb(var(--color-bg-card))",
        },
        accent: {
          DEFAULT: "rgb(var(--color-accent))",
          dim: "rgb(var(--color-accent-dim))",
        },
        text: {
          primary: "rgb(var(--color-text-primary))",
          secondary: "rgb(var(--color-text-secondary))",
          muted: "rgb(var(--color-text-muted))",
        },
      },
    },
  },
  plugins: [],
};
