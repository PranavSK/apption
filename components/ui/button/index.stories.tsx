import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '.';

export default {
  component: Button,
  args: {
    children: 'Button',
  },
} satisfies Meta<typeof Button>;
type Story = StoryObj<typeof Button>;

export const Default: Story = {};
