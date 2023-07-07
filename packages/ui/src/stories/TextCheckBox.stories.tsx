import type { Meta, StoryObj } from '@storybook/react';

import { TextCheckBox } from '../components';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Text-CheckBox',
  component: TextCheckBox,
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof TextCheckBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Selected: Story = {
  args: {
    text: 'Title',
    selected: true,
    onClick: () => console.log('clicked')
  },
};

export const UnSelected: Story = {
  args: {
    text: 'Title',
    selected: false,
    onClick: () => console.log('clicked')
  },
};

export const LongString: Story = {
  args: {
    text: 'LongString',
    selected: false,
    onClick: () => console.log('clicked')
  },
};
