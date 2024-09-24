import type { Meta, StoryObj } from '@storybook/react';
import { PlaylistHeader } from './PlaylistHeader';

export default {
	component: PlaylistHeader,
} as Meta<typeof PlaylistHeader>;

export const Default: StoryObj<typeof PlaylistHeader> = {
	args: {
		bpm: 120,
	},
};
