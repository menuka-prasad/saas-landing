/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // enables dark mode via .dark class
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // All brand/theme variables are in brand.css
    },
  },
  plugins: [],
};
