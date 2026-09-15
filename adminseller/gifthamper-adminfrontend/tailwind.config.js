/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#8B3A62',
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#8B3A62',
          600: '#7a2f54',
          700: '#6b2547',
          800: '#5c1f3c',
          900: '#4d1a32',
        },
        secondary: {
          DEFAULT: '#D4AF37',
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#D4AF37',
          500: '#caa832',
          600: '#b8952d',
          700: '#a68128',
          800: '#946d23',
          900: '#82591e',
        },
        sidebar: '#1a1a2e',
      },
    },
  },
  plugins: [],
};
