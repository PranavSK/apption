'use client';

import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react';
import { Root } from '@radix-ui/react-label';

import { cn } from '@/lib/utils';

export const Label = forwardRef<ElementRef<typeof Root>, ComponentPropsWithoutRef<typeof Root>>(
  ({ className, ...props }, ref) => (
    <Root
      ref={ref}
      className={cn(
        'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        className,
      )}
      {...props}
    />
  ),
);
Label.displayName = Root.displayName;
