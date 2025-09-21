import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#2563eb",
          light: "#3b82f6",
          dark: "#1d4ed8"
        },
        charcoal: "#111827",
        ash: "#6b7280",
        mint: "#34d399",
        amber: "#f59e0b"
      },
      boxShadow: {
        soft: "0 25px 50px -12px rgba(37, 99, 235, 0.15)"
      }
    }
  },
  plugins: []
};

export default config;
