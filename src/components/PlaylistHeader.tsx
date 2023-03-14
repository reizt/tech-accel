import type { FC } from 'react';

type Props = {
  bpm: number;
  onClose: () => void;
};

export const PlaylistHeader: FC<Props> = ({ bpm, onClose }) => {
  return (
    <header className="flex w-screen-x gap-x-16 bg-blue-700 px-16 pt-16 pb-32">
      <button onClick={onClose} className="flex h-48 w-48 items-center justify-center">
        <svg className="w-24" width="24" height="15" viewBox="0 0 24 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.82 0L12 9.16L21.18 0L24 2.82L12 14.82L0 2.82L2.82 0Z" fill="#EFF2F5" />
        </svg>
      </button>
      <div className="grow pt-16 text-white">
        <div className="flex w-64 flex-col items-center text-center font-bold">
          <span className="text-24 leading-none tracking-0.02">BPM</span>
          <span className="font-dosis text-48 leading-none tracking-0.038">{bpm}</span>
        </div>
      </div>
    </header>
  );
};
