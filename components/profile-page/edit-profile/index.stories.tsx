import { action } from '@storybook/addon-actions';
import { type Meta, type StoryObj } from '@storybook/react';

import { EditProfile } from '.';

export default {
  component: EditProfile,
} as Meta<typeof EditProfile>;

export const Default: StoryObj<typeof EditProfile> = {
  args: {
    username: 'johndoe',
    fullName: 'John Doe',
    website: 'https://example.com',

    onAvatarUploadUrlRequest(name) {
      action('onAvatarUploadUrlRequest')(name);
      return Promise.resolve(['https:/example.com', `https://example.com/${name}`]);
    },
  },
};
