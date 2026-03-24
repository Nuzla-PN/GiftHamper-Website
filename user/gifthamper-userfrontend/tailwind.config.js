/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
    sm: '640px',
    md: '768px',
    lg: '900px', // change this
    xl: '1280px',
  },
    extend: {},
  },
  plugins: [require('@tailwindcss/line-clamp')],
}