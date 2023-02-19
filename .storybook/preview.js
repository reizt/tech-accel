import * as NextImage from 'next/image';
import '../src/styles/globals.css';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

// Next imageのdefault exportを上書き
Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props) => <img {...props} />,
});
