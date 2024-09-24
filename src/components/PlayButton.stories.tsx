import type { Meta, StoryObj } from '@storybook/react';
import { PlayButton } from './PlayButton';

export default {
	component: PlayButton,
} as Meta<typeof PlayButton>;

export const NotPlaying: StoryObj<typeof PlayButton> = {
	args: {
		playing: false,
	},
};

export const Playing: StoryObj<typeof PlayButton> = {
	args: {
		playing: true,
	},
};
