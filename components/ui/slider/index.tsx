'use client';

import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react';
import { Range, Root, Thumb, Track } from '@radix-ui/react-slider';

import { cn } from '@/lib/utils';

export const Slider = forwardRef<ElementRef<typeof Root>, ComponentPropsWithoutRef<typeof Root>>(
  ({ className, ...props }, ref) => {
    const value = props.value ?? props.defaultValue ?? [props.min ?? 0];
    return (
      <Root
        ref={ref}
        className={cn('relative flex w-full touch-none select-none items-center', className)}
        {...props}
      >
        <Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-teal3 dark:bg-dark-teal3">
          <Range className="absolute h-full bg-teal9" />
        </Track>
        {value.map((_, i) => (
          <Thumb
            key={i}
            className="block h-4 w-4 rounded-full border border-teal8 bg-teal3 shadow transition-colors hover:bg-teal4 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-teal8 disabled:pointer-events-none dark:border-dark-teal8 dark:hover:bg-dark-teal4 dark:focus-visible:ring-dark-teal8"
          />
        ))}
      </Root>
    );
  },
);
Slider.displayName = 'Slider';
