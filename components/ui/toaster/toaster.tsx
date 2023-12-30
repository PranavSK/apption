'use client';

import { type ComponentPropsWithoutRef, type FC } from 'react';
import { useTheme } from 'next-themes';
import { Toaster as Sonner } from 'sonner';

import { cn } from '@/lib/utils';

type ToasterProps = Omit<ComponentPropsWithoutRef<typeof Sonner>, 'theme' | 'toastOptions'>;
export const Toaster: FC<ToasterProps> = (props) => {
  const { theme = 'system' } = useTheme();
  return (
    <Sonner
      toastOptions={{
        classNames: {
          toast: cn(
            'flex items-center gap-2 rounded-md border px-4 py-2 text-xs focus-visible:outline-none focus-visible:!ring-1 data-[type]:border-none',
            'border-teal6 bg-teal2 text-sage12 shadow-md shadow-teal9 focus-visible:ring-teal8',
            'dark:border-dark-teal6 dark:bg-dark-teal2 dark:text-dark-sage12 dark:shadow-dark-teal9 dark:focus-visible:ring-dark-teal8',
            'data-[type=success]:bg-green9 data-[type=success]:text-dark-sage12 data-[type=success]:shadow-green9 data-[type=success]:focus-visible:ring-green8',
            'dark:data-[type=success]:bg-dark-green9 dark:data-[type=success]:text-dark-sage12 dark:data-[type=success]:shadow-dark-green9 dark:data-[type=success]:focus-visible:ring-dark-green8',
            'data-[type=error]:bg-red9 data-[type=error]:text-dark-sage12 data-[type=error]:shadow-red9 data-[type=error]:focus-visible:ring-red8',
            'dark:data-[type=error]:bg-dark-red9 dark:data-[type=error]:text-dark-sage12 dark:data-[type=error]:shadow-dark-red9 dark:data-[type=error]:focus-visible:ring-dark-red8',
            'data-[type=info]:bg-blue9 data-[type=info]:text-dark-sage12 data-[type=info]:shadow-blue9 data-[type=info]:focus-visible:ring-blue8',
            'dark:data-[type=info]:bg-dark-blue9 dark:data-[type=info]:text-dark-sage12 dark:data-[type=info]:shadow-dark-blue9 dark:data-[type=info]:focus-visible:ring-dark-blue8',
            'data-[type=warning]:bg-amber9 data-[type=warning]:text-dark-sage12 data-[type=warning]:shadow-amber9 data-[type=warning]:focus-visible:ring-amber8',
            'dark:data-[type=warning]:bg-dark-amber9 dark:data-[type=warning]:text-dark-sage12 dark:data-[type=warning]:shadow-dark-amber9 dark:data-[type=warning]:focus-visible:ring-dark-amber8',
          ),
          title: cn('text-sm'),
          actionButton:
            'bg-teal3 text-sage12 hover:bg-teal4 active:bg-teal5 disabled:text-sage11 dark:bg-dark-teal3 dark:text-dark-sage12 dark:hover:bg-dark-teal4 dark:active:bg-dark-teal5 dark:disabled:text-sage11',
        },
        unstyled: true,
        duration: 10000,
      }}
      theme={theme as 'light' | 'dark' | 'system'}
      {...props}
    />
  );
};
