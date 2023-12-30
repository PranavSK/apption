import { action } from '@storybook/addon-actions';
import { type Meta, type StoryObj } from '@storybook/react';

import { UserAuthForm } from '.';

export default {
  component: UserAuthForm,
} satisfies Meta<typeof UserAuthForm>;

export const Default: StoryObj<typeof UserAuthForm> = {
  args: {
    onSubmit: (data) => {
      action('onSubmit')(data);
      return Promise.resolve();
    },
  },
};
