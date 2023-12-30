import { Resend } from 'resend';

import { MagicLink } from '@/components/emails/magic-link';
import { env } from '@/env';
import { type AuthApiData } from '@/lib/validations/auth';

const resend = new Resend(env.RESEND_API_KEY);
export async function sendMagicLinkEmail(email: string, params: AuthApiData) {
  const linkUrl = new URL('/api/auth/token', env.NEXT_PUBLIC_SITE_URL);
  Object.entries(params).forEach(([key, value]) => linkUrl.searchParams.set(key, value));

  // TODO: get a better from address
  return resend.emails.send({
    from: 'you@resend.com',
    to: email,
    subject: 'Hello, World!',
    react: <MagicLink linkUrl={linkUrl.toString()} />,
  });
}
