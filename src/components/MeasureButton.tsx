import type { ButtonHTMLAttributes, FC } from 'react';
import { formatMeasurementSeconds } from '#/features/measurement';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
	measuring: boolean;
	leftSeconds?: number;
};

export const MeasureButton: FC<Props> = ({ measuring, leftSeconds = 0, className = '', ...restProps }) => {
	return (
		<button
			className={`relative flex size-240 shrink-0 items-center justify-center rounded-full border-2 border-white bg-white-300 shadow-measure-button ${className}`}
			{...restProps}
		>
			{measuring ? (
				<>
					<span className="size-40 bg-white-600" />
					<span className="absolute top-144 text-16 font-extrabold leading-none text-white-600">
						{formatMeasurementSeconds(leftSeconds)}
					</span>
				</>
			) : (
				<span className="text-32 font-extrabold text-white-600">TAP</span>
			)}
		</button>
	);
};
