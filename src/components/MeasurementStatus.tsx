import type { FC } from 'react';
import { AccelerationWave } from './AccelerationWave';

type Props = {
  status: 'initial' | 'progress' | 'completed';
  accelerationList?: number[];
};

export const MeasurementStatus: FC<Props> = ({ status, accelerationList }) => {
  return (
    <div className="flex w-136 flex-col justify-center">
      <AccelerationWave
        className="mb-16 w-full"
        accelerationList={
          {
            initial: Array(10).fill(0.2),
            progress: accelerationList ?? Array(10).fill(0),
            completed: Array(10).fill(1),
          }[status]
        }
      />

      <div className="text-center text-16 font-normal">
        {
          {
            initial: '計測していません',
            progress: '計測中…',
            completed: '計測完了',
          }[status]
        }
      </div>
    </div>
  );
};
