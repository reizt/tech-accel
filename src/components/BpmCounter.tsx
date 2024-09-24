import type { FC } from 'react';

type Props = {
	bpm: number;
	onPlus: () => void;
	onMinus: () => void;
};

export const BpmCounter: FC<Props> = ({ bpm, onPlus, onMinus }) => {
	return (
		<div className="flex w-216 flex-col items-center">
			<div className="mb-8 flex h-76 items-center gap-x-16 font-dosis">
				<button
					type="button"
					onClick={onMinus}
					className="flex size-32 items-center justify-center text-64 text-black-700"
				>
					<span className="relative -top-8">-</span>
				</button>
				<div className="w-128 text-center text-96 leading-none text-black">{Math.floor(bpm)}</div>
				<button
					type="button"
					onClick={onPlus}
					className="flex size-32 items-center justify-center text-64 text-black-700"
				>
					<span className="relative -top-6">+</span>
				</button>
			</div>
			<div className="text-16 font-bold text-white-600">BPM</div>
		</div>
	);
};
