import { cookies, headers } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';
import { OAuthRequestError } from '@lucia-auth/oauth';
import { ZodError } from 'zod';

import { auth } from '@/lib/auth';
import { getValidatedGithubUser } from '@/lib/auth/github';
import { authGithubSchema } from '@/lib/validations/auth';

export async function GET(request: NextRequest) {
  const cookieStore = cookies();
  const storedState = cookieStore.get('github_oauth_state')?.value;
  const { searchParams } = new URL(request.nextUrl);
  const { code, state } = authGithubSchema.parse(Object.fromEntries(searchParams.entries()));

  if (!storedState || !state || storedState !== state || !code) {
    return NextResponse.json(null, {
      status: 422,
      statusText: 'Invalid state. Try again.',
    });
  }

  try {
    const { userId } = await getValidatedGithubUser(code);
    await auth.invalidateAllUserSessions(userId);
    const session = await auth.createSession({ userId, attributes: {} });
    const authRequest = auth.handleRequest(request.method, { cookies, headers });
    authRequest.setSession(session);
    const redirectTo = request.nextUrl.clone();
    redirectTo.pathname = '/dashboard';
    return NextResponse.redirect(redirectTo);
  } catch (error) {
    if (error instanceof OAuthRequestError) {
      return NextResponse.json(
        { error },
        {
          status: 422,
          statusText: 'Invalid code. Try again.',
        },
      );
    }

    if (error instanceof ZodError) {
      return NextResponse.json(
        { error },
        {
          status: 422,
          statusText: 'Unable to fetch verified email from GitHub. Try again.',
        },
      );
    }
  }
}
