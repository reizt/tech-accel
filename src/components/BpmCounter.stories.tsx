import type { ComponentMeta, ComponentStoryFn } from '@storybook/react';
import { useState } from 'react';
import { BpmCounter } from './BpmCounter';

export default {
  component: BpmCounter,
} as ComponentMeta<typeof BpmCounter>;

export const Default: ComponentStoryFn<typeof BpmCounter> = (args) => {
  const [bpm, setBpm] = useState<number>(100);
  return <BpmCounter bpm={bpm} onPlus={() => setBpm(bpm + 1)} onMinus={() => setBpm(bpm - 1)} />;
};
