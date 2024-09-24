import type { Meta, StoryObj } from '@storybook/react';
import { LoginButton } from './LoginButton';

export default {
	component: LoginButton,
} as Meta<typeof LoginButton>;

export const Default: StoryObj<typeof LoginButton> = {
	args: {
		className: 'w-320',
	},
};
