import { type Meta, type StoryObj } from '@storybook/react';

import { EmojiPicker } from '.';

export default {
  component: EmojiPicker,
} satisfies Meta<typeof EmojiPicker>;
export const Default: StoryObj<typeof EmojiPicker> = {
  args: { defaultValue: '👍' },
};
