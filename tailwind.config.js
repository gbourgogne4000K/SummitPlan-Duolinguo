/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Couleurs Duolingo-style
        'duo-green': '#58CC02',
        'duo-blue': '#1CB0F6',
        'duo-red': '#FF4B4B',
        'duo-yellow': '#FFC800',
        'duo-purple': '#CE82FF',
        'duo-orange': '#FF9600',
        'duo-gray': '#AFAFAF',
        'duo-dark': '#4B4B4B',
        'duo-bg': '#F7F7F7',
      },
      fontFamily: {
        'sans': ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        'duo': '0 4px 0 0 rgba(0,0,0,0.15)',
        'duo-hover': '0 2px 0 0 rgba(0,0,0,0.15)',
      },
    },
  },
  plugins: [],
}
