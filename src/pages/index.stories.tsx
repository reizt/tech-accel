import type { ComponentMeta, ComponentStory } from '@storybook/react';
import Home from '.';

const meta: ComponentMeta<typeof Home> = {
  title: 'Page/Home',
  component: Home,
};
export default meta;

const Template: ComponentStory<typeof Home> = (args) => <Home {...args} />;

export const Default = Template.bind({});
