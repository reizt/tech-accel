import type { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { MeasurementStatus } from './MeasurementStatus';

export default {
  component: MeasurementStatus,
} as ComponentMeta<typeof MeasurementStatus>;

export const Initial: ComponentStoryObj<typeof MeasurementStatus> = {
  args: {
    status: 'initial',
  },
};

export const Progress: ComponentStoryObj<typeof MeasurementStatus> = {
  args: {
    status: 'progress',
    accelerationList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  },
};

export const Completed: ComponentStoryObj<typeof MeasurementStatus> = {
  args: {
    status: 'completed',
  },
};
