import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Paleta San Sur: verdes y blancos, alto contraste para buena legibilidad.
        sansur: {
          bg: "#FFFFFF",
          surface: "#F3F8F4", // verde muy claro, casi blanco
          border: "#D7E6DA",
          ink: "#16261B", // texto principal, casi negro con matiz verde
          muted: "#4B5D50", // texto secundario
          green: {
            50: "#EEF6EF",
            100: "#D7EADB",
            300: "#8FC49B",
            500: "#3C8156", // verde principal de marca
            600: "#2F6B47",
            700: "#245538",
          },
          alert: "#B5502F", // solo para deuda / atención, nunca decorativo
        },
      },
      fontFamily: {
        sans: [
          "Atkinson Hyperlegible",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
      },
      fontSize: {
        // Escala más grande de lo habitual: pensada para adultos mayores.
        base: ["18px", "28px"],
        lg: ["20px", "30px"],
        xl: ["24px", "32px"],
        "2xl": ["30px", "38px"],
        "3xl": ["36px", "44px"],
      },
      borderRadius: {
        card: "14px",
      },
    },
  },
  plugins: [],
};
export default config;
