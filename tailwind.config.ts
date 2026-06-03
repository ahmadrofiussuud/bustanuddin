import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1a4731",
          dark: "#123323",
          light: "#225c40",
        },
        secondary: {
          DEFAULT: "#2d6a4f",
          dark: "#1b4332",
          light: "#40916c",
        },
        accent: {
          DEFAULT: "#52b788",
          dark: "#2d6a4f",
          light: "#74c69d",
        },
        lightAccent: {
          DEFAULT: "#d8f3dc",
          hover: "#b7e4c7",
        },
        textDark: "#ffffff",
        textLight: "#1b1b1b",
        bgLight: "#f8fdf9",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
