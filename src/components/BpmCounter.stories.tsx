import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { BpmCounter } from './BpmCounter';

export default {
	component: BpmCounter,
} as Meta<typeof BpmCounter>;

export const Default: StoryObj<typeof BpmCounter> = {
	render: (args) => {
		const [bpm, setBpm] = useState<number>(100);
		return <BpmCounter bpm={bpm} onPlus={() => setBpm(bpm + 1)} onMinus={() => setBpm(bpm - 1)} />;
	},
};
