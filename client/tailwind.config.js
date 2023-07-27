/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        login_primary: "#2952e3",
        login_secondary: "#2546bd",
      },
    },
  },
  plugins: [],
};
