import type { Meta, StoryObj } from '@storybook/react';

import { TwoOptionRadioButton } from '../components';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Two-Option-Radio-Button',
  component: TwoOptionRadioButton,
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof TwoOptionRadioButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const First: Story = {
  args: {
    value: '일반 뽑기',
    options: ['일반 뽑기', '타로 뽑기'],
    onClickItem: (item: string) => {
      console.log(`${item} clicked`);
    },
  },
};

export const Second: Story = {
  args: {
    value: '타로 뽑기',
    options: ['일반 뽑기', '타로 뽑기'],
    onClickItem: (item: string) => {
      console.log(`${item} clicked`);
    },
  },
};
