import { redirect } from 'next/navigation';
import type { ReactNode } from 'react';

import { getPageSession } from '@/lib/auth/session';

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await getPageSession();
  if (!session) {
    return redirect('/login');
  }

  return <section className="flex grow flex-col justify-center">{children}</section>;
}
