import { forwardRef, type InputHTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-9 w-full rounded-md border border-teal7 bg-teal3 px-3 py-1.5 text-sm text-sage12 shadow-sm shadow-teal9 transition-colors file:mr-2 file:rounded-md file:border-0 file:bg-teal9 file:px-2 file:text-sm file:font-medium file:text-dark-sage12 placeholder:text-sage11 hover:bg-teal4 focus-visible:border-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-teal8 active:bg-teal5 disabled:pointer-events-none disabled:cursor-not-allowed disabled:text-sage11 disabled:opacity-50 dark:border-dark-teal7 dark:bg-dark-teal3 dark:text-dark-sage12 dark:shadow-dark-teal9 dark:placeholder:text-dark-sage11 dark:hover:bg-dark-teal4 dark:focus-visible:ring-dark-teal8 dark:active:bg-dark-teal5 dark:disabled:text-sage11',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';
