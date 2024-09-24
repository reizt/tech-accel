import type { Meta, StoryObj } from '@storybook/react';
import { MeasurementStatus } from './MeasurementStatus';

export default {
	component: MeasurementStatus,
} as Meta<typeof MeasurementStatus>;

export const Initial: StoryObj<typeof MeasurementStatus> = {
	args: {
		status: 'initial',
	},
};

export const Progress: StoryObj<typeof MeasurementStatus> = {
	args: {
		status: 'progress',
		accelerationList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
	},
};

export const Completed: StoryObj<typeof MeasurementStatus> = {
	args: {
		status: 'completed',
	},
};
