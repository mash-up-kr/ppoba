import type { Meta, StoryObj } from '@storybook/react';

import { SecondaryButton } from '../components';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'SecondaryButton',
  component: SecondaryButton,
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof SecondaryButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const BaseButton: Story = {
  args: {
    children: 'Btn',
    rightIcon: 'deckAdd',
    onClick: () => console.log('BaseButton'),
  },
};

export const MediumButton: Story = {
  args: {
    children: 'Button',
    size: 'medium',
    onClick: () => console.log('MediumButton'),
  },
};

export const ShuffleButton: Story = {
  args: {
    children: '섞기',
    rightIcon: 'shuffle',
    onClick: () => console.log('ShuffleButton'),
  },
};

export const DisabledButton: Story = {
  args: {
    disabled: true,
    children: 'Btn',
    rightIcon: 'deckAdd',
  },
};
