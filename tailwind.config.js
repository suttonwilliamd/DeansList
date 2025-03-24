/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./script.js"], // Important for JIT mode and dynamic class names
  theme: {
    extend: {
      colors: {
        'primary': '#1e3a8a', // Dark blue
        'secondary': '#3b82f6', // Lighter blue
        'accent': '#f97316', // Orange
        'gray-50': '#f9fafb', // Light gray (match your original background)
        'gray-800': '#1f2937', // Dark gray for header/footer
        'gray-900': '#111827', // Even darker gray for headings
      },
      fontFamily: {
        'sans': ['Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        'serif': ['Merriweather', 'serif'],
      },
    },
  },
  plugins: [],
}
