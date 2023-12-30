'use server';

import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { auth } from '@/lib/auth';
import { getExistingDbUserByEmail } from '@/lib/auth/email';
import { githubAuth } from '@/lib/auth/github';
import { generateAuthToken } from '@/lib/auth/token';
import { type AuthFormData } from '@/lib/validations/auth';

import { sendMagicLinkEmail } from './email';

export async function loginWithEmail({ email }: AuthFormData) {
  return Promise.reject(new Error('Not implemented'));
  // TODO:
  // // Check if the email is already in use
  // const existingDbUserWithEmail = await getExistingDbUserByEmail(email);
  // const user = existingDbUserWithEmail
  //   ? auth.transformDatabaseUser(existingDbUserWithEmail)
  //   : // Else create a new user.
  //     // NOTE: How should we handle invalid emails?
  //     await auth.createUser({ attributes: { email }, key: null });

  // const token = await generateAuthToken(user.userId);
  // await sendMagicLinkEmail(email, { token });
}

export async function loginWithGithub() {
  const [url, state] = await githubAuth.getAuthorizationUrl();
  const cookieStore = cookies();
  cookieStore.set('github_oauth_state', state, {
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60,
  });

  return redirect(url.toString());
}

export async function logout() {
  const authRequest = auth.handleRequest('POST', { cookies, headers });
  const session = await authRequest.validate();
  if (!session) {
    return;
  }
  await auth.invalidateSession(session.sessionId);
  // delete session cookie
  authRequest.setSession(null);
  return redirect('/login');
}
