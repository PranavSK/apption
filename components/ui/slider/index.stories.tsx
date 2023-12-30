import { type Meta, type StoryObj } from '@storybook/react';

import { Slider } from '.';

export default { component: Slider } satisfies Meta<typeof Slider>;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  args: {
    min: 0,
    max: 100,
    step: 1,
    defaultValue: [50],
  },
};
