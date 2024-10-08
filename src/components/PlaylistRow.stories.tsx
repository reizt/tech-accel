import type { Meta, StoryObj } from '@storybook/react';
import { PlaylistRow } from './PlaylistRow';

export default {
	component: PlaylistRow,
} as Meta<typeof PlaylistRow>;

export const NotPlayingNow: StoryObj<typeof PlaylistRow> = {
	args: {
		serialNumber: 1,
		song: {
			name: '秒針を噛む秒針を噛む秒針を噛む秒針を噛む秒針を噛む秒針を噛む秒針を噛む秒針を噛む秒針を噛む秒針を噛む',
			artistName:
				'ずっと真夜中でいいのにずっと真夜中でいいのにずっと真夜中でいいのにずっと真夜中でいいのにずっと真夜中でいいのに',
			seconds: 259,
		},
		style: {
			width: '22.375rem', // Storybookで綺麗に見えるように
		},
	},
};

export const PlayingNow: StoryObj<typeof PlaylistRow> = {
	args: {
		...NotPlayingNow.args,
		playingNow: true,
	},
};

export const Wide: StoryObj<typeof PlaylistRow> = {
	args: {
		...NotPlayingNow.args,
		playingNow: true,
		style: {
			width: '40rem',
		},
	},
};
