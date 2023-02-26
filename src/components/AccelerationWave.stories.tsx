import { useState } from '@storybook/addons';
import type { ComponentMeta, ComponentStoryFn } from '@storybook/react';
import { AccelerationWave } from './AccelerationWave';

export default {
  component: AccelerationWave,
} as ComponentMeta<typeof AccelerationWave>;

export const Example: ComponentStoryFn<typeof AccelerationWave> = (args) => {
  const fixedArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [array, setArray] = useState<number[]>(fixedArray);

  const next = () => {
    const last = array[array.length - 1];
    if (last == null) return;
    const newArray = [last, ...array.slice(0, array.length - 1)];
    setArray(newArray);
  };

  return (
    <>
      <AccelerationWave accelerationList={array} />
      <button onClick={() => next()}>進む</button>
    </>
  );
};
