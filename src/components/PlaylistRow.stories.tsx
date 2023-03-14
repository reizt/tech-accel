import type { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { PlaylistRow } from './PlaylistRow';

export default {
  component: PlaylistRow,
} as ComponentMeta<typeof PlaylistRow>;

export const NotPlayingNow: ComponentStoryObj<typeof PlaylistRow> = {
  args: {
    serialNumber: 1,
    song: {
      name: '秒針を噛む',
      artistName: 'ずっと真夜中でいいのに',
      seconds: 259,
    },
    style: {
      width: '22.375rem', // Storybookで綺麗に見えるように
    },
  },
};

export const PlayingNow: ComponentStoryObj<typeof PlaylistRow> = {
  args: {
    ...NotPlayingNow.args,
    playingNow: true,
  },
};
