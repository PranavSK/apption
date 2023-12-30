import type { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return <main className="flex h-screen flex-col justify-center overflow-hidden">{children}</main>;
}
