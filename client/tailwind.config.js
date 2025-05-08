/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "gc-green": "#00A651",
        "gc-white": "#FFFFFF",
        "gc-dark-gray": "#333333",
        "gc-light-gray": "#F5F5F5",
        "gc-blue": "#007BFF",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
