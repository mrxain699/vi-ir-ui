/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
    },
    extend: {
      boxShadow: {
        light: "0 2px 3px 0px rgba(0, 0, 0, 0.3)",
      },
      width: {
        "1/3": "calc(100% - 250px)",
      },
      height: {
        "1/3": "calc(100% - 60px)",
      },
    },
  },
  plugins: [],
};
