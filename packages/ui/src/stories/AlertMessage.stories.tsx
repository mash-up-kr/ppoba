import type { Meta, StoryObj } from '@storybook/react';

import { AlertMessage } from '../components';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'AlertMessage',
  component: AlertMessage,
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof AlertMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    iconWidth: 24,
    iconHeight: 24,
    iconType: 'alert',
    text: '최대 글자를 넘어서 입력이 안되고 있어 :(',
  },
};

export const NonIcon: Story = {
  args: {
    text: '아이콘이 없는 경우에요',
  },
};
