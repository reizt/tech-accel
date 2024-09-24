import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
	framework: '@storybook/react-vite',
	stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
	docs: {},
};

export default config;
