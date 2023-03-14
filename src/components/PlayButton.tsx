import type { ButtonHTMLAttributes, FC } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  playing: boolean;
};

export const PlayButton: FC<Props> = ({ playing, className = '', ...restProps }) => {
  return (
    <button
      className={`flex h-64 w-64 items-center justify-center rounded-full border-1 border-white bg-white-300 text-blue-700 shadow-play-button ${className}`}
      {...restProps}
    >
      {playing ? (
        <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0V20L15.7143 10L0 0Z" fill="#627294" />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0H18V18H0V0Z" fill="#627294" />
        </svg>
      )}
    </button>
  );
};
