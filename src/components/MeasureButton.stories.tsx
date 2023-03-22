import type { ComponentMeta, ComponentStoryFn, ComponentStoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';
import { MeasureButton } from './MeasureButton';

export default {
  component: MeasureButton,
} as ComponentMeta<typeof MeasureButton>;

export const Initial: ComponentStoryObj<typeof MeasureButton> = {
  args: {
    measuring: false,
  },
};
export const Measuring: ComponentStoryFn<typeof MeasureButton> = (args) => {
  const [seconds, setSeconds] = useState<number>(90);
  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);
  return <MeasureButton measuring leftSeconds={seconds} />;
};
