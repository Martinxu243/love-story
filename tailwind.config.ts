import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        night: {
          base: "#0d1a2e",
          mid: "#152238",
          deep: "#1a2a44",
          light: "#1e3250",
        },
        skyglow: "rgba(120,170,210,0.25)",
        starlight: "#c8d8f0",
        starmid: "#8090b0",
        stardim: "#7080a0",
        warm: {
          cream: "#f5f2ec",
          sand: "#e8e0d5",
          base: "#faf8f6",
        },
        accent: {
          blue: "#7aa8c8",
          soft: "#b0c8e0",
        },
        gradient: {
          from: "#f0f4fa",
          to: "#8098b8",
        },
        node: {
          love: "#e8a0b0",
          travel: "#7aa8c8",
          anniversary: "#d8c898",
          daily: "#98b8a0",
        },
      },
      fontFamily: {
        serif: ["Georgia", "'Times New Roman'", "serif"],
        sans: ["-apple-system", "'PingFang SC'", "'Microsoft YaHei'", "sans-serif"],
      },
      borderRadius: {
        card: "18px",
        medium: "14px",
        small: "10px",
      },
    },
  },
  plugins: [],
};
export default config;
