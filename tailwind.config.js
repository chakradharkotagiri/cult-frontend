/** @type {import('tailwindcss').Config} */
import scrollbar from 'tailwind-scrollbar';

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        // Navbar height: the one value sticky columns and page heights rely on.
        nav: "5rem",
      },
      fontFamily: {
        barriecito: ["Barriecito", "serif"], // Register the Barriecito font
        times: ['Times New Roman', 'serif'],
        Inter: ['Inter', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [scrollbar],
};
