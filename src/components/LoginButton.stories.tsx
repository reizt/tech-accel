import type { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { LoginButton } from './LoginButton';

export default {
  component: LoginButton,
} as ComponentMeta<typeof LoginButton>;

export const Default: ComponentStoryObj<typeof LoginButton> = {
  args: {
    className: 'w-320',
  },
};
