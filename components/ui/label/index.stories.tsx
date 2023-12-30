import { type Meta, type StoryObj } from '@storybook/react';

import { Label } from '.';

export default {
  component: Label,
} as Meta<typeof Label>;

export const Default: StoryObj<typeof Label> = {
  args: {
    children: 'This is a label',
  },
};
