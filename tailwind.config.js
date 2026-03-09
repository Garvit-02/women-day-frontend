/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#e11d48",
        secondary: "#0f172a"
      }
    }
  },
  plugins: []
}
