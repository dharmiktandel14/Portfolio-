/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      screens: { "3xl": "1920px" },
      fontFamily: { sans: ["Inter", "system-ui", "sans-serif"] },
      colors: { graphite: "#1E1E1E", ink: "#121212", stroke: "#2A2A2A" },
    },
  },
  plugins: [],
};
