import type { Meta, StoryObj } from '@storybook/react';

import { Title } from '.';

export default {
  component: Title,
} as Meta<typeof Title>;

export const Default: StoryObj<typeof Title> = {
  args: {
    children: 'Title',
    subtitle: 'Subtitle',
    caption: 'Caption',
  },
};
