import { action } from '@storybook/addon-actions';
import { type Meta, type StoryObj } from '@storybook/react';

import { AuthPage } from '.';

export default {
  component: AuthPage,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof AuthPage>;
export const Default: StoryObj<typeof AuthPage> = {
  args: {
    loginWithEmail(data) {
      action('loginWithEmail')(data);
      return Promise.resolve();
    },
    loginWithGithub: action('loginWithGithub'),
  },
};
