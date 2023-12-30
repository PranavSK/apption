import { github } from '@lucia-auth/oauth/providers';
import { z } from 'zod';

import { env } from '@/env';
import { auth } from '@/lib/auth';
import { zodFetch } from '@/lib/utils';

import { getExistingDbUserByEmail } from './email';

export const githubAuth = github(auth, {
  clientId: env.GITHUB_CLIENT_ID,
  clientSecret: env.GITHUB_CLIENT_SECRET,
  scope: ['user:email'],
});

export async function getValidatedGithubUser(code: string) {
  const { getExistingUser, githubTokens, createUser, createKey } =
    await githubAuth.validateCallback(code);

  const existingUser = await getExistingUser();
  if (existingUser) return existingUser;
  // The validate callback returns the public GitHub profile which can have an null email
  // We need to make a separate request to get the private GitHub verified email
  const request = new Request('https://api.github.com/user/emails', {
    headers: {
      Authorization: `Bearer ${githubTokens.accessToken}`,
      Accept: 'application/vnd.github+json',
      'User-Agent': 'lucia',
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });
  const primaryEmail = await zodFetch(
    z
      .object({ email: z.string().email(), verified: z.boolean(), primary: z.boolean() })
      .array()
      .nonempty()
      .transform((emails) => emails.find((email) => email.primary && email.verified)?.email)
      .pipe(z.string().email()),
    request,
  );
  console.log('Fetching verified email from GitHub', primaryEmail);
  // Check if the email is already in use
  const existingDbUserWithEmail = await getExistingDbUserByEmail(primaryEmail);
  if (existingDbUserWithEmail) {
    const user = auth.transformDatabaseUser(existingDbUserWithEmail);
    // Link the GitHub account to the existing user using key
    await createKey(user.userId);
    return user;
  }

  // If the email is not in use, create a new user
  return await createUser({ attributes: { email: primaryEmail } });
}
