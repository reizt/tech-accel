import type { ButtonHTMLAttributes, FC } from 'react';

type Props = {} & ButtonHTMLAttributes<HTMLButtonElement>;

export const LoginButton: FC<Props> = ({ className = '', ...restProps }) => {
	return (
		<button className={`h-48 rounded-32 bg-green-spotify text-16 font-normal text-white ${className}`} {...restProps}>
			ログイン
		</button>
	);
};
