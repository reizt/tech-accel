import type { NextPage } from 'next';
import { getProviders, signIn } from 'next-auth/react';
import Image from 'next/image';
import { LoginButton } from '#/components/LoginButton';

const LoginPage: NextPage = () => {
	return (
		<div className="flex h-screen-y flex-col items-center justify-between px-36 py-144">
			<Image src={'/spotify.svg'} alt="Spotify" width={240} height={72.73} />
			<LoginButton
				className="w-full max-w-320"
				onClick={() => {
					signIn('spotify').catch((err) => console.error(err));
				}}
			/>
		</div>
	);
};

export async function getServerSideProps() {
	const providers = await getProviders();
	return {
		props: { providers },
	};
}

export default LoginPage;
