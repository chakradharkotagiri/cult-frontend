/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        barriecito: ["Barriecito", "serif"], // Register the Barriecito font
        times: ['Times New Roman', 'serif'],
      },
    },
  },
  plugins: [],
};
