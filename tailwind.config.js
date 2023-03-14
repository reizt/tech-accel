/** TailwindCSSのconfigで使うHOC */
const keysToObj = (keys, keyToValue) => {
  const obj = {};
  for (const key of keys) {
    obj[key] = keyToValue(key);
  }
  return obj;
};

// 昇順で入れて管理する
const pxs = [8, 16, 24, 32, 40, 48, 64, 96, 128, 136, 216, 320];
const PX_PER_REM = 16;
const remsMap = keysToObj(pxs, (px) => `${px / PX_PER_REM}rem`); // e.g. {1: '1rem', 2: '2rem'}

const screenMap = { 'screen-x': '100vw', 'screen-y': '100vh' };

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      white: {
        DEFAULT: '#ffffff',
      },
      black: {
        DEFAULT: '#000000',
      },
      green: {
        DEFAULT: '#00db00',
        spotify: '#1db954',
      },
      blue: {
        700: '#627294',
      },
    },
    spacing: { ...remsMap, ...screenMap, auto: 'auto' },
    fontSize: { ...remsMap },
    borderRadius: { ...remsMap, full: '100%' },
    fontFamily: {
      mp1: ['var(--font-mp1)'],
      dosis: ['var(--font-dosis)'],
    },
    extend: {
      maxWidth: { ...remsMap, ...screenMap },
      maxHeight: { ...remsMap, ...screenMap },
      minWidth: { ...remsMap, ...screenMap },
      minHeight: { ...remsMap, ...screenMap },
      letterSpacing: keysToObj([0.02, 0.038], (x) => x),
    },
  },
  plugins: [],
};
