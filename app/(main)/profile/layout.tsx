import type { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return <section className="flex grow flex-col justify-center">{children}</section>;
}
