import type { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { PlaylistHeader } from './PlaylistHeader';

export default {
  component: PlaylistHeader,
} as ComponentMeta<typeof PlaylistHeader>;

export const Default: ComponentStoryObj<typeof PlaylistHeader> = {
  args: {
    bpm: 120,
  },
};
