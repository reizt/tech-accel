import type { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { SampleButton } from './SampleButton';

export default {
  component: SampleButton,
} as ComponentMeta<typeof SampleButton>;

export const Colored: ComponentStoryObj<typeof SampleButton> = {
  args: {
    color: 'colored',
    children: 'Sample Button',
  },
};

export const Monochrome: ComponentStoryObj<typeof SampleButton> = {
  args: {
    color: 'monochrome',
    children: 'Sample Button',
  },
};
