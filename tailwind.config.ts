import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        rtl: { raw: "[dir='rtl']" },
        ltr: { raw: "[dir='ltr']" },
      },
      colors: {
        guillotine: {
          50: "#faf5ff",
          100: "#f0e8ff",
          200: "#e2d0ff",
          300: "#ccaaff",
          400: "#b078ff",
          500: "#9438ff",
          600: "#8714ff",
          700: "#7800ff",
          800: "#6500d4",
          900: "#5400ad",
          950: "#370076",
        },
        noir: {
          50: "#f6f6f7",
          100: "#e2e2e6",
          200: "#c5c5cc",
          300: "#a0a0ad",
          400: "#7d7d8e",
          500: "#636374",
          600: "#4e4e5c",
          700: "#41414c",
          800: "#383841",
          900: "#121212",
          950: "#0a0a0b",
        },
        cyber: {
          teal: "#00f0ff",
          pink: "#ff00e5",
          purple: "#8b00ff",
          red: "#ff0044",
          amber: "#ffaa00",
          green: "#00ff88",
        },
        profit: {
          positive: "#00ff88",
          negative: "#ff0044",
          warning: "#ffaa00",
          neutral: "#00f0ff",
        },
      },
      fontFamily: {
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Syne", "Inter", "sans-serif"],
      },
      backgroundImage: {
        "noir-gradient":
          "linear-gradient(135deg, #0a0a0b 0%, #1a1a2e 50%, #0a0a0b 100%)",
        "cyber-grid":
          "linear-gradient(rgba(0, 240, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.03) 1px, transparent 1px)",
        "glass-gradient":
          "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
        "verdict-terminate":
          "linear-gradient(135deg, #ff0044 0%, #cc0033 100%)",
        "verdict-reprice":
          "linear-gradient(135deg, #ffaa00 0%, #cc8800 100%)",
        "verdict-keep": "linear-gradient(135deg, #00ff88 0%, #00cc66 100%)",
      },
      animation: {
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "slide-up": "slide-up 0.5s ease-out",
        "slide-down": "slide-down 0.3s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "scale-in": "scale-in 0.3s ease-out",
        "glow": "glow 2s ease-in-out infinite alternate",
        "cyber-scan": "cyber-scan 3s linear infinite",
        "typewriter": "typewriter 2s steps(40) 1s forwards",
        "neon-pulse": "neon-pulse 1.5s ease-in-out infinite alternate",
        "data-stream": "data-stream 20s linear infinite",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { opacity: "1", filter: "brightness(1)" },
          "50%": { opacity: "0.8", filter: "brightness(1.3)" },
        },
        "slide-up": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "slide-down": {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "glow": {
          "0%": { boxShadow: "0 0 5px rgba(148, 56, 255, 0.5)" },
          "100%": { boxShadow: "0 0 20px rgba(148, 56, 255, 0.8)" },
        },
        "cyber-scan": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        "typewriter": {
          "0%": { width: "0" },
          "100%": { width: "100%" },
        },
        "neon-pulse": {
          "0%": { textShadow: "0 0 7px rgba(148, 56, 255, 0.6)" },
          "100%": { textShadow: "0 0 20px rgba(148, 56, 255, 1), 0 0 40px rgba(148, 56, 255, 0.4)" },
        },
        "data-stream": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("tailwindcss-animate")],
};

export default config;
