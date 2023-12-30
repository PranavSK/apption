import type { FC, ReactNode } from 'react';

import { ThemeProvider } from './theme-provider';

interface ProvidersProps {
  children: ReactNode;
}

export const Providers: FC<ProvidersProps> = ({ children }) => (
  <ThemeProvider>{children}</ThemeProvider>
);
