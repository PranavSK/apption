import { cache } from 'react';
import { cookies, headers } from 'next/headers';

import { auth } from '@/lib/auth';

export const getPageSession = cache(async () => {
  const authRequest = auth.handleRequest('GET', { cookies, headers });
  const session = await authRequest.validate();
  return session;
});
