import { type Meta, type StoryObj } from '@storybook/react';

import { DisplayProfile } from '.';

export default {
  component: DisplayProfile,
} as Meta<typeof DisplayProfile>;
export const Default: StoryObj<typeof DisplayProfile> = {
  args: {
    username: 'johndoe',
    fullName: 'John Doe',
    avatarUrl: 'https://avatars.githubusercontent.com/u/1?v=4',
    website: 'https://example.com',
  },
};
