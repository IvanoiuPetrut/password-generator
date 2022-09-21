/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "accent-color": "#A4FFAF",
        gray: {
          500: "#929199",
          700: "#23222A",
          800: "#18171F",
          900: "#0F0E14",
        },
      },
    },
  },
  plugins: [],
};
