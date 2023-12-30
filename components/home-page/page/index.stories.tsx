import { type Meta, type StoryObj } from '@storybook/react';

import { HomePage } from '.';

export default {
  component: HomePage,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof HomePage>;

export const Default: StoryObj<typeof HomePage> = {};
