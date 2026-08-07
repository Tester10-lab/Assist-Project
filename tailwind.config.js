/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        headline: ['Outfit', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#f8fafc',
          100: '#f1f5f9',
          500: '#3b82f6',
          600: '#2563eb', // Corporate Blue
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a', // Deep Navy
        },
        accent: {
          50: '#fff7ed',
          100: '#ffedd5',
          500: '#f97316', // Terracotta/Orange
          600: '#ea580c',
          700: '#c2410c',
        }
      }
    },
  },
  plugins: [],
}
