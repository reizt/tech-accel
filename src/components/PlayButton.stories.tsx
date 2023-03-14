import type { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { PlayButton } from './PlayButton';

export default {
  component: PlayButton,
} as ComponentMeta<typeof PlayButton>;

export const NotPlaying: ComponentStoryObj<typeof PlayButton> = {
  args: {
    playing: false,
  },
};

export const Playing: ComponentStoryObj<typeof PlayButton> = {
  args: {
    playing: true,
  },
};
