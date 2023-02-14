/** TailwindCSSのconfigで使うHOC */
const keysToObj = (keys, keyToValue) => {
  const obj = {};
  for (const key of keys) {
    obj[key] = keyToValue(key);
  }
  return obj;
};

// 昇順で入れて管理する
const pxs = [40];
const PX_PER_REM = 10;
const remsMap = keysToObj(pxs, (px) => `${px / PX_PER_REM}rem`); // e.g. {1: '1rem', 2: '2rem'}

const screenMap = { 'screen-x': '100vw', 'screen-y': '100vh' };

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      green: '#00db00',
    },
    spacing: { ...remsMap, ...screenMap, auto: 'auto' },
    fontSize: { ...remsMap },
    borderRadius: { ...remsMap, full: '100%' },
    extend: {
      maxWidth: { ...remsMap, ...screenMap },
      maxHeight: { ...remsMap, ...screenMap },
      minWidth: { ...remsMap, ...screenMap },
      minHeight: { ...remsMap, ...screenMap },
    },
  },
  plugins: [],
};
