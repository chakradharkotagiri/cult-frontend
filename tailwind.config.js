/** @type {import('tailwindcss').Config} */
import scrollbar from 'tailwind-scrollbar';

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        barriecito: ["Barriecito", "serif"], // Register the Barriecito font
        times: ['Times New Roman', 'serif'],
        avenir: ['Avenir', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [scrollbar],
};
