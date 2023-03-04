import { formatMeasurementSeconds } from '#/features/measurement';
import type { FC } from 'react';

type Props = {
  measuring: boolean;
  leftSeconds?: number;
};

export const MeasureButton: FC<Props> = ({ measuring, leftSeconds = 0 }) => {
  return (
    <button className="relative flex h-240 w-240 items-center justify-center rounded-full border-2 border-white bg-white-300 shadow-measure-button">
      {measuring ? (
        <>
          <div className="h-40 w-40 bg-white-600"></div>
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
