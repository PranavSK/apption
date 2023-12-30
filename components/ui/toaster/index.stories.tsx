import { type Decorator, type Meta, type StoryObj } from '@storybook/react';

import { Button } from '../button';
import { toast, Toaster } from '.';

export default {
  component: Toaster,
} as Meta<typeof Toaster>;
type Story = StoryObj<typeof Toaster>;

function toastDecorator(onClick: () => void): Decorator {
  return function ToastDecorator(Story) {
    return (
      <div>
        <Story />
        <Button onClick={onClick}>Toast</Button>
      </div>
    );
  };
}

export const Default: Story = {
  decorators: [toastDecorator(() => toast('Default Toast'))],
};

export const Description: Story = {
  decorators: [
    toastDecorator(() =>
      toast('Toast tittle', { description: 'This is the description of the toast' }),
    ),
  ],
};

export const Success: Story = {
  decorators: [
    toastDecorator(() =>
      toast.success('Success Toast', { description: 'This is the description' }),
    ),
  ],
};

export const Error: Story = {
  decorators: [
    toastDecorator(() => toast.error('Error Toast', { description: 'This is the description' })),
  ],
};

export const Info: Story = {
  decorators: [
    toastDecorator(() => toast.info('Info Toast', { description: 'This is the description' })),
  ],
};

export const Warning: Story = {
  decorators: [
    toastDecorator(() =>
      toast.warning('Warning Toast', { description: 'This is the description' }),
    ),
  ],
};

export const Action: Story = {
  decorators: [
    toastDecorator(() =>
      toast('Action Toast', {
        description: 'This is the description',
        action: { label: 'Action', onClick: () => toast('Action clicked') },
      }),
    ),
  ],
};

export const Cancel: Story = {
  decorators: [
    toastDecorator(() =>
      toast('Cancel Toast', {
        description: 'This is the description',
        action: { label: 'Cancel', onClick: () => toast('Cancel clicked') },
      }),
    ),
  ],
};

export const PromiseSuccess: Story = {
  decorators: [
    toastDecorator(() => {
      const promise = () =>
        new Promise<{ name: string }>((resolve) =>
          setTimeout(() => resolve({ name: 'Sonner' }), 2000),
        );

      toast.promise(promise, {
        loading: 'Loading...',
        success: (data) => {
          return `${data.name} toast has been added`;
        },
        error: 'Error',
      });
    }),
  ],
};

export const PromiseError: Story = {
  decorators: [
    toastDecorator(() => {
      const promise = () =>
        new Promise((_, reject) => setTimeout(() => reject('Promise toast on error'), 2000));

      toast.promise(promise, {
        loading: 'Loading...',
        success: 'Success',
        error: (error) => `${error}`,
      });
    }),
  ],
};

export const TopLeft: Story = {
  decorators: [toastDecorator(() => toast('Top Left Toast'))],
  args: { position: 'top-left' },
};

export const TopCenter: Story = {
  decorators: [toastDecorator(() => toast('Top Center Toast'))],
  args: { position: 'top-center' },
};

export const TopRight: Story = {
  decorators: [toastDecorator(() => toast('Top Right Toast'))],
  args: { position: 'top-right' },
};

export const BottomLeft: Story = {
  decorators: [toastDecorator(() => toast('Bottom Left Toast'))],
  args: { position: 'bottom-left' },
};

export const BottomCenter: Story = {
  decorators: [toastDecorator(() => toast('Bottom Center Toast'))],
  args: { position: 'bottom-center' },
};

export const BottomRight: Story = {
  decorators: [toastDecorator(() => toast('Bottom Right Toast'))],
  args: { position: 'bottom-right' },
};
