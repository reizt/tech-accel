import type { ButtonHTMLAttributes, FC } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
	direction: 'prev' | 'next';
};

export const SkipButton: FC<Props> = ({ direction, ...restProps }) => {
	return (
		<button
			className={
				'flex size-48 items-center justify-center rounded-full border-1 border-white bg-white-300 text-blue-700 shadow-play-button'
			}
			{...restProps}
		>
			{direction === 'prev' && (
				<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M0 0H2V12H0V0ZM3.5 6L12 12V0L3.5 6Z" fill="#627294" />
				</svg>
			)}
			{direction === 'next' && (
				<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M0 12L8.5 6L0 0V12ZM10 0V12H12V0H10Z" fill="#627294" />
				</svg>
			)}
		</button>
	);
};
