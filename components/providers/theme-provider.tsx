'use client';

import { ThemeProvider as NextThemeProvider } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes/dist/types';
import type { FC } from 'react';

export const ThemeProvider: FC<ThemeProviderProps> = ({ children, ...props }) => (
  <NextThemeProvider attribute="class" {...props}>
    {children}
  </NextThemeProvider>
);
