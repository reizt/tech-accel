import { ButtonHTMLAttributes, FC, useMemo } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  playingNow: boolean;
  serialNumber: number;
  song: {
    name: string;
    artistName: string;
    seconds: number;
  };
};

export const PlaylistRow: FC<Props> = ({ playingNow, serialNumber, song, className = '', ...restProps }) => {
  const secondsFormat = useMemo(
    () =>
      `${Math.floor(song.seconds / 60)
        .toString()
        .padStart(2, '0')}:${(song.seconds % 60).toString().padStart(2, '0')}`,
    [song.seconds],
  );
  return (
    <button className={`flex h-78 items-center p-16 ${playingNow ? 'bg-white-500' : ''} ${className}`} {...restProps}>
      <span className="w-24 text-left font-bold text-black-600">{serialNumber}</span>
      <span className="flex h-full grow flex-col items-start justify-between">
        <span className="text-18 leading-snug">{song.name}</span>
        <span className="text-12 leading-snug text-black-600">{song.artistName}</span>
      </span>
      <span className="text-12 text-black-600">{secondsFormat}</span>
    </button>
  );
};
