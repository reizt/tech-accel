import type { FC, ReactNode } from 'react';

type Props = {
  color: 'colored' | 'monochrome';
  children: ReactNode;
};

export const SampleButton: FC<Props> = ({ color, children }) => {
  return (
    <button
      className={`h-40 w-160 rounded-20 text-16 font-bold ${
        { colored: 'bg-green text-white', monochrome: 'bg-black text-white' }[color]
      }`}
    >
      {children}
    </button>
  );
};
