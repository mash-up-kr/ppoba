import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../components';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Button',
  component: Button,
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const BaseButton: Story = {
  args: {
    children: 'Button',
    onClick: () => console.log('BaseButton'),
  },
};

export const ButtonWithIcon: Story = {
  args: {
    children: 'Button',
    size: 'large',
    rightIcon: 'goLight',
    onClick: () => console.log('ButtonWithIcon'),
  },
};

export const DisabledButton: Story = {
  args: {
    disabled: true,
    children: 'Button',
  },
};
