import { formatSeconds } from '#/features/time/format-seconds';
import type { ButtonHTMLAttributes, FC } from 'react';

export type PlaylistRowSong = {
  name: string;
  artistName: string;
  seconds: number;
};

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  playingNow: boolean;
  serialNumber: number;
  song: PlaylistRowSong;
};

export const PlaylistRow: FC<Props> = ({ playingNow, serialNumber, song, className = '', ...restProps }) => {
  return (
    <button className={`flex h-78 items-center p-16 ${playingNow ? 'bg-white-500' : ''} ${className}`} {...restProps}>
      <span className="w-24 text-left font-bold text-black-600">{serialNumber}</span>
      <span className="flex h-full w-[calc(100%-24rem/16-34rem/16)] grow flex-col items-start justify-between">
        <span className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-18 leading-snug">{song.name}</span>
        <span className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-12 leading-snug text-black-600">
          {song.artistName}
        </span>
      </span>
      <span className="w-36 text-12 text-black-600">{formatSeconds(song.seconds)}</span>
    </button>
  );
};
