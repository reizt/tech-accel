import type { Preview } from '@storybook/react';
import '../src/styles/globals.css';

export default {
	parameters: {
		controls: {
			expanded: true,
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/,
			},
		},
		nextjs: {
			appDirectory: true,
		},
	},
} as Preview;
