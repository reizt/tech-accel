import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';
import { MeasureButton } from './MeasureButton';

export default {
	component: MeasureButton,
} as Meta<typeof MeasureButton>;

export const Initial: StoryObj<typeof MeasureButton> = {
	args: {
		measuring: false,
	},
};
export const Measuring: StoryObj<typeof MeasureButton> = {
	render: (args) => {
		const [seconds, setSeconds] = useState<number>(90);
		useEffect(() => {
			const intervalId = window.setInterval(() => {
				setSeconds((prev) => prev - 1);
			}, 1000);
			return () => clearInterval(intervalId);
		}, []);
		return <MeasureButton measuring leftSeconds={seconds} />;
	},
};
