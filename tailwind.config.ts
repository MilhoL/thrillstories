import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        surface: "#F5F3EF",
        ink: "#111111",
        accent: "#7E57C2",
        danger: "#EF4444",
        muted: "#6B7280",
        border: "#E5E2DC",
      },
      fontFamily: {
        display: ['"Playfair Display"', "Georgia", "serif"],
        body: ['"Source Serif 4"', "Georgia", "serif"],
        sans: ['"DM Sans"', "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "8px",
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
        hover: "0 8px 25px rgba(0,0,0,0.08)",
      },
      maxWidth: {
        prose: "680px",
        page: "1200px",
      },
    },
  },
  plugins: [],
};

export default config;
