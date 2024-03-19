/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{html,jsx,tsx,js,ts}"],
  theme: {
    extend: {
      boxShadow: {
        custom: "0px 1px 4px rgba(0, 0, 0, 0.24)",
      },
      colors: {
        primary: "#f2f3f5",
        secondary: "#47b647",
      },
    },
  },
  plugins: [],
};
