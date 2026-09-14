/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    screens: {
    sm: '640px',
    md: '768px',
    lg: '900px', // change this
    xl: '1280px',
  },
    extend: {fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },},
  },
  plugins: [require('@tailwindcss/line-clamp')],
}