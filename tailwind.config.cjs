const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: '#0e0c29',
        secondary: '#00c4cc',
      },
      transitionProperty: {
        top: 'top',
      },
      transitionTimingFunction: {
        custom: 'cubic-bezier(0, 0.8, 0.13, 1)',
      },
    },
  },
  plugins: [],
};
