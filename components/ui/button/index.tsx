import { type ButtonHTMLAttributes, forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-teal8 disabled:pointer-events-none dark:focus-visible:ring-dark-teal8',
  {
    variants: {
      variant: {
        default:
          'bg-teal9 text-dark-sage12 shadow shadow-teal9 hover:bg-teal10 active:bg-teal9 disabled:text-dark-sage11',
        destructive:
          'bg-red9 text-dark-sage12 shadow shadow-red9 hover:bg-red10 active:bg-red9 disabled:text-dark-sage11 dark:bg-dark-red9 dark:shadow-dark-red9 dark:hover:bg-dark-red10 dark:active:bg-dark-red9',
        outline:
          'border border-teal7 text-sage12 shadow-sm shadow-teal9 hover:bg-teal3 active:bg-teal5 disabled:text-sage11 dark:border-dark-teal7 dark:text-dark-sage12 dark:shadow-dark-teal9 dark:hover:bg-dark-teal3 dark:active:bg-dark-teal5 dark:disabled:text-sage11',
        ghost:
          'text-sage12 hover:bg-teal3 active:bg-teal5 disabled:text-sage11 dark:text-dark-sage12 dark:hover:bg-dark-teal3 dark:active:bg-dark-teal5 dark:disabled:text-sage11',
        link: 'text-sage12 underline-offset-4 hover:underline dark:text-dark-sage12',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild, variant, size, className, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = 'Button';
