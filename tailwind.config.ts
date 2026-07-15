import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0e4a40",
          dark: "#072a24",
          light: "#145c50",
        },
        secondary: {
          DEFAULT: "#145c50",
          dark: "#0b3b33",
          light: "#1d7667",
        },
        accent: {
          DEFAULT: "#ff9100",
          dark: "#d97b00",
          light: "#ffa733",
        },
        lightAccent: {
          DEFAULT: "#e6f2f0",
          hover: "#cde6e2",
        },
        textDark: "#ffffff",
        textLight: "#1b1b1b",
        bgLight: "#f8faf9",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
