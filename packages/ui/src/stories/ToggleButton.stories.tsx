import type { Meta, StoryObj } from '@storybook/react';

import { ToggleButton } from '../components';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Toggle-Button',
  component: ToggleButton,
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof ToggleButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Active: Story = {
  args: {
    value: true,
    onClick: () => {
      console.log('button clicked');
    },
  },
};

export const InActive: Story = {
  args: {
    value: false,
    onClick: () => {
      console.log('button clicked');
    },
  },
};
