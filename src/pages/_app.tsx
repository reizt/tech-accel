import { Dosis, M_PLUS_1 } from '@next/font/google';
import type { AppProps } from 'next/app';
import '../styles/globals.css';

const mp1 = M_PLUS_1({
  weight: ['400', '800'],
  subsets: ['latin'],
  fallback: ['sans-serif'],
  adjustFontFallback: false,
  preload: false,
  variable: '--font-mp1',
});
const dosisRegular = Dosis({
  weight: ['400'],
  subsets: ['latin'],
  fallback: ['sans-serif'],
  adjustFontFallback: false,
  preload: false,
  variable: '--font-dosis',
});

export default function ({ Component, pageProps }: AppProps) {
  return (
    <div className={`${mp1.variable} ${dosisRegular.variable} font-mp1`}>
      <Component {...pageProps} />
    </div>
  );
}
