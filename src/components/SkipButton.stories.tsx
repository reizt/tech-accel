import type { Meta, StoryObj } from '@storybook/react';
import { SkipButton } from './SkipButton';

export default {
	component: SkipButton,
} as Meta<typeof SkipButton>;

export const Prev: StoryObj<typeof SkipButton> = {
	args: {
		direction: 'prev',
	},
};

export const Next: StoryObj<typeof SkipButton> = {
	args: {
		direction: 'next',
	},
};
