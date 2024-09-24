import { Dosis, M_PLUS_1 } from '@next/font/google';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import '../styles/globals.css';

const mp1Regular = M_PLUS_1({
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

export default function ({ Component, pageProps: { session, ...rest } }: AppProps) {
	return (
		<SessionProvider session={session}>
			<div className={`${mp1Regular.variable} ${dosisRegular.variable} font-mp1`}>
				<Component {...rest} />
			</div>
		</SessionProvider>
	);
}
