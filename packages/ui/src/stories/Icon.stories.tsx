import type { Meta, StoryObj } from '@storybook/react';

import { Icon } from '../components';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Icon',
  component: Icon,
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const BaseIcon: Story = {
  args: {
    type: 'arrow',
    width: '32',
    height: '32',
  },
};
