import { type Meta, type StoryObj } from '@storybook/react';

import { Popover, PopoverContent, PopoverTrigger } from '.';

export default { component: Popover } as Meta<typeof Popover>;
export const Default: StoryObj<typeof Popover> = {
  render: () => (
    <Popover>
      <PopoverTrigger>Open</PopoverTrigger>
      <PopoverContent>Place content for the popover here.</PopoverContent>
    </Popover>
  ),
};
