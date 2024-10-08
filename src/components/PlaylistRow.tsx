import type { ButtonHTMLAttributes, FC } from 'react';

export type PlaylistRowSong = {
	name: string;
	artistName: string;
	seconds: number;
	tempo?: number;
};

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
	playingNow: boolean;
	serialNumber: number;
	song: PlaylistRowSong;
	onClick?: () => void;
};

export const PlaylistRow: FC<Props> = ({ playingNow, serialNumber, song, className = '', onClick, ...restProps }) => {
	return (
		<button
			onClick={onClick}
			className={`flex h-78 items-center p-16 ${playingNow ? 'bg-white-500' : ''} ${className}`}
			{...restProps}
		>
			<span className="w-24 text-left font-bold text-black-600">{serialNumber}</span>
			<span className="flex h-full w-[calc(100%-24rem/16-64rem/16)] grow flex-col items-start justify-between">
				<span className="max-w-full truncate text-18 leading-snug">{song.name}</span>
				<span className="max-w-full truncate text-12 leading-snug text-black-600">{song.artistName}</span>
			</span>
			<span className="w-64 whitespace-nowrap text-right text-12 text-black-600">
				{song.tempo != null ? `${Math.floor(song.tempo)} bpm` : undefined}
			</span>
		</button>
	);
};
