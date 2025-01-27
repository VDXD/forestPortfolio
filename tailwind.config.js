/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        creepster: ["Creepster", "cursive"],
      },
      animation: {
        flicker: "flicker 1.5s infinite",
        glitch: "glitch 2s infinite",
      },
      keyframes: {
        flicker: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.8 },
        },
        glitch: {
          "0%, 100%": { transform: "translate(0)" },
          "20%": { transform: "translate(-1px, 1px)" },
          "40%": { transform: "translate(1px, -1px)" },
          "60%": { transform: "translate(-1px, -1px)" },
          "80%": { transform: "translate(1px, 1px)" },
        },
        colors: {
          black: {
            DEFAULT: "#000",
            100: "#010103",
            200: "#0E0E10",
            300: "#1C1C21",
            500: "#3A3A49",
            600: "#1A1A1A",
          },
          white: {
            DEFAULT: "#FFFFFF",
            800: "#E4E4E6",
            700: "#D6D9E9",
            600: "#AFB0B6",
            500: "#62646C",
          },
        },
      },
    },
  },
  plugins: [],
};
