/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./public/**/*.{html, js}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        inter: "'Inter', sans-serif",
        fira: "'Fira Code', monospace",
      },
      colors: {
        "navy-300": "#233554",
        "navy-600": "#133040",
        "navy-900": "#0a192f",
      },
      spacing: {
        1.5: "2px",
      },
      content: {
        empty: "''",
      },
      transitionDuration: {
        250: "250ms",
        400: "400ms",
      },
      animation: {
        steam: "steam 30s linear infinite",
        morpheus: "morpheus 10s linear infinite",
      },
      keyframes: {
        steam: {
          "0%": {
            backgroundPosition: "0 0",
          },
          "50%": {
            backgroundPosition: "400% 0",
          },
          "100%": {
            backgroundPosition: "0 0",
          },
        },
        morpheus: {
          "0%": {
            borderRadius: "30% 70% 70% 30%/30% 30% 70% 70%",
          },
          "20%": {
            borderRadius: "60% 40% 40% 60%/60% 25% 75% 40%",
          },
          "40%": {
            borderRadius: "70% 30% 65% 35%/80% 45% 55% 20%",
          },
          "60%": {
            borderRadius: "30% 70% 70% 30%/20% 30% 70% 80%",
          },
          "80%": {
            borderRadius: "40% 60% 40% 60%/70% 55% 45% 30%",
          },
          "100%": {
            borderRadius: "30% 70% 70% 30%/30% 30% 70% 70%",
          },
        },
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "bg-gradient": (angle) => ({
            "background-image": `linear-gradient(${angle}, var(--tw-gradient-stops))`,
          }),
        },
        {
          values: Object.assign(theme("bgGradientDeg", {}), {
            45: "45deg",
          }),
        }
      );
    }),
  ],
};
