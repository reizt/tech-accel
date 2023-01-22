/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  purge: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      white: {
        DEFAULT: '#ffffff',
        100: '#fafafa',
        200: '#eeeeee',
      },
      black: {
        DEFAULT: '#000000',
        100: '#160c28',
        200: '#2b2d42',
        300: '#24285b',
      },
      gray: '#8d99ae',
      primary: '#dff000',
    },
    extend: {},
  },
  plugins: [],
};
