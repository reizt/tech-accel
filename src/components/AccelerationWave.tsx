import { type FC, useMemo } from 'react';
import { makeWavePath } from '#/features/wave';

type Props = {
	accelerationList: number[];
	className?: string;
};

const VIEW_BOX = {
	w: 120,
	h: 72,
};
const LINE_WIDTH = 2;
const REPEAT_TIMES = 5;
const MAX_ACCELERATION = 10;

export const AccelerationWave: FC<Props> = ({ accelerationList, className }) => {
	const amplitudes = useMemo(
		() =>
			accelerationList.map((acceleration) => {
				if (acceleration >= MAX_ACCELERATION) return 1;
				return acceleration / MAX_ACCELERATION;
			}),
		[accelerationList],
	);

	const wave = useMemo(
		() => ({
			w: VIEW_BOX.w / (REPEAT_TIMES * 2),
			hList: amplitudes.map((a) => (VIEW_BOX.h * a) / 2),
		}),
		[amplitudes],
	);

	const path = useMemo(() => makeWavePath({ viewBox: VIEW_BOX, wave }), [wave]);

	return (
		<svg
			width={VIEW_BOX.w + LINE_WIDTH}
			height={VIEW_BOX.h + LINE_WIDTH}
			viewBox={`0 0 ${VIEW_BOX.w + LINE_WIDTH} ${VIEW_BOX.h + LINE_WIDTH}`}
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
		>
			<path d={path} stroke="black" strokeWidth={LINE_WIDTH} transform={`translate(0 ${LINE_WIDTH / 2})`} />
		</svg>
	);
};
