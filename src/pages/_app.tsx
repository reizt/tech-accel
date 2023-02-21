import { M_PLUS_1 } from '@next/font/google';
import type { AppProps } from 'next/app';
import '../styles/globals.css';

const mPlus1Regular = M_PLUS_1({
  weight: '400',
  subsets: ['latin'],
});

export default function ({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${mPlus1Regular.style.fontFamily};
          font-weight: ${mPlus1Regular.style.fontWeight!};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}
