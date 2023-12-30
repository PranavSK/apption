import { redirect } from 'next/navigation';
import type { Metadata, NextPage } from 'next';

import { loginWithEmail, loginWithGithub } from '@/actions/auth';
import { AuthPage } from '@/components/auth-page/page';
import { getPageSession } from '@/lib/auth/session';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your account',
};

const Page: NextPage = async () => {
  const session = await getPageSession();
  if (session) return redirect('/dashboard');
  return <AuthPage loginWithEmail={loginWithEmail} loginWithGithub={loginWithGithub} />;
};

export default Page;
