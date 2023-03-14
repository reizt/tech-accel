/** TailwindCSSのconfigで使うHOC */
const keysToObj = (keys, keyToValue) => {
  const obj = {};
  for (const key of keys) {
    obj[key] = keyToValue(key);
  }
  return obj;
};

// 昇順で入れて管理する
const pxs = [8, 16, 32, 40, 48, 64, 96, 128, 136, 216, 320];
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
        300: '#eff2f5',
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
    borderWidth: keysToObj([1], (x) => x),
    fontFamily: {
      mp1: ['var(--font-mp1)'],
    },
    extend: {
      maxWidth: { ...remsMap, ...screenMap },
      maxHeight: { ...remsMap, ...screenMap },
      minWidth: { ...remsMap, ...screenMap },
      minHeight: { ...remsMap, ...screenMap },
      boxShadow: {
        'play-button': '0 0.125rem 0.3125rem #00000040',
      },
    },
  },
  plugins: [],
};
