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
        ivory: "#F9F5EB",
        gold: "#D4AF37",
        "gold-hover": "#B5952F",
        "soft-pink": "#F8C8DC",
        "dark-gray": "#333333",
      },
    },
  },
  plugins: [],
};
export default config;
