/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      backgroundColor: {
        amazonBlue: "#146eb4",
        amazonDarkBlue: "#0f58a0",
      },
      colors: {
        primary: {
          DEFAULT: "#3b5ba5",
          50: "#f4f5fb",
          100: "#e8ebf6",
          200: "#cbd5ec",
          300: "#9eb1db",
          400: "#6a89c6",
          500: "#476ab0",
          600: "#3b5ba5",
          700: "#2c4278",
          800: "#283a64",
          900: "#253255",
          950: "#192138",
        },
        accent: {
          DEFAULT: "#e87a5d",
          50: "#fdf5f3",
          100: "#fce9e4",
          200: "#fbd7cd",
          300: "#f7baaa",
          400: "#f19178",
          500: "#e87a5d",
          600: "#d25230",
          700: "#b14124",
          800: "#923922",
          900: "#7a3422",
          950: "#42180d",
        },
        warn: {
          DEFAULT: "#f3b941",
          50: "#fef9ec",
          100: "#fcf0c9",
          200: "#f8de8f",
          300: "#f4c855",
          400: "#f3b941",
          500: "#eb9115",
          600: "#d06d0f",
          700: "#ad4d10",
          800: "#8c3b14",
          900: "#733214",
          950: "#421806",
        },
      },
    },
  },
  plugins: [],
};
