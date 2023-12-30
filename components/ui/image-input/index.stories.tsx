import { type Meta, type StoryObj } from '@storybook/react';

import { ImageInput } from '.';

export default {
  component: ImageInput,
} satisfies Meta<typeof ImageInput>;
type Story = StoryObj<typeof ImageInput>;

export const Default: Story = {};
