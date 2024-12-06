/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: {
          900: "#121212", // deepest black-gray (background)
          800: "#1e1e1e", // very dark gray (card background)
          700: "#2c2c2c", // dark gray (modal background or secondary sections)
          600: "#383838", // medium dark gray (borders, dividers)
          500: "#4a4a4a", // medium gray (text)
          400: "#666666", // lighter gray (secondary text)
          300: "#808080", // light gray (placeholder text)
          200: "#b3b3b3", // very light gray (input background)
          100: "#e6e6e6", // lightest gray (border color)
        },
        highlight: {
          primary: "#3b82f6", // blue accent color
          secondary: "#f97316", // orange accent color
          accent: "#10b981", // green accent color (for positive indicators)
        },
      },
    },
  },
  plugins: [],
};
