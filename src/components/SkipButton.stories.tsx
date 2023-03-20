import type { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { SkipButton } from './SkipButton';

export default {
  component: SkipButton,
} as ComponentMeta<typeof SkipButton>;

export const Prev: ComponentStoryObj<typeof SkipButton> = {
  args: {
    direction: 'prev',
  },
};

export const Next: ComponentStoryObj<typeof SkipButton> = {
  args: {
    direction: 'next',
  },
};
