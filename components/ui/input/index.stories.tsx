import { type Meta, type StoryObj } from '@storybook/react';

import { Input } from '.';

export default {
  component: Input,
  args: {
    placeholder: 'Type here...',
  },
} as Meta<typeof Input>;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {},
};

export const Email: Story = {
  args: {
    type: 'email',
  },
};

export const Password: Story = {
  args: {
    type: 'password',
  },
};

export const Date: Story = {
  args: {
    type: 'date',
  },
};

export const DateTime: Story = {
  args: {
    type: 'datetime-local',
  },
};

export const Month: Story = {
  args: {
    type: 'month',
  },
};

export const Number: Story = {
  args: {
    type: 'number',
  },
};

export const Search: Story = {
  args: {
    type: 'search',
  },
};

export const Time: Story = {
  args: {
    type: 'time',
  },
};

export const Week: Story = {
  args: {
    type: 'week',
  },
};

export const Tel: Story = {
  args: {
    type: 'tel',
  },
};

export const Url: Story = {
  args: {
    type: 'url',
  },
};

export const Color: Story = {
  args: {
    type: 'color',
  },
};

export const File: Story = {
  args: {
    type: 'file',
  },
};
