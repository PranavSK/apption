import { type Meta, type StoryObj } from '@storybook/react';

import { Sidebar } from '.';

export default {
  component: Sidebar,
} as Meta<typeof Sidebar>;
type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {};
