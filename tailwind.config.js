/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      colors: {
        indigo: {
          50: '#eef2f9',
          100: '#e0e7f4',
          500: '#2b5ea9',
          700: '#0B3677',
          800: '#082a5c',
        },
        emerald: {
          50: '#e6faef',
          500: '#00CC66',
          600: '#00b359',
        },
        red: {
          50: '#fde9ec',
          500: '#EE2346',
          600: '#d51f3e',
        },
        orange: {
          50: '#fff8e8',
          500: '#FAB81F',
          600: '#e1a61c',
        },
        blue: {
          500: '#00A0CA',
        },
      }
    },
  },
  plugins: [],
}
