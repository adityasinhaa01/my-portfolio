/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cosmic: {
          void: "#040508",
          deep: "#050508",
          card: "#0b0b0e",
          surface: "#07070a",
          gold: "#d8b48a",
          cream: "#f5efe6",
          parchment: "#f4ece1",
          amber: "#e6c79c"
        }
      }
    },
  },
  plugins: [],
}
