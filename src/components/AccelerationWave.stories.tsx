import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { AccelerationWave } from './AccelerationWave';

export default {
	component: AccelerationWave,
} as Meta<typeof AccelerationWave>;

export const Example: StoryObj<typeof AccelerationWave> = {
	render: (args) => {
		const fixedArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
		const [array, setArray] = useState<number[]>(fixedArray);

		const next = () => {
			const last = array[array.length - 1];
			if (last == null) return;
			const newArray = [last, ...array.slice(0, array.length - 1)];
			setArray(newArray);
		};

		return (
			<>
				<AccelerationWave accelerationList={array} />
				<button type="button" onClick={() => next()}>
					進む
				</button>
			</>
		);
	},
};
