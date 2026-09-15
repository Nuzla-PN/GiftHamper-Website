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
          50: '#F5E8EF',
          100: '#EAD1DF',
          200: '#D5A3BF',
          300: '#C0759F',
          400: '#AB477F',
          500: '#8B3A62',
          600: '#722E4E',
          700: '#59233B',
          800: '#401827',
          900: '#270D16',
        },
        secondary: {
          DEFAULT: '#D4AF37',
          50: '#FBF6E8',
          100: '#F7EDD1',
          200: '#EFDBA3',
          300: '#E7C975',
          400: '#DFB747',
          500: '#D4AF37',
          600: '#AA8C2C',
          700: '#806921',
          800: '#554616',
          900: '#2B230B',
        },
        background: '#FDF5F3',
      },
    },
  },
  plugins: [],
};
