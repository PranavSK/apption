import { cookies, headers } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';

import { auth } from '@/lib/auth';
import { validateAuthToken } from '@/lib/auth/token';
import { authApiSchema } from '@/lib/validations/auth';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.nextUrl);
  try {
    const options = authApiSchema.parse(Object.fromEntries(searchParams.entries()));
    const userId = await validateAuthToken(options.token);
    await auth.invalidateAllUserSessions(userId);
    const session = await auth.createSession({ userId, attributes: {} });
    const authRequest = auth.handleRequest(request.method, { cookies, headers });
    authRequest.setSession(session);
    const redirectTo = request.nextUrl.clone();
    redirectTo.pathname = options.next || '/dashboard';
    return NextResponse.redirect(redirectTo);
  } catch (error) {
    return NextResponse.json(
      { error },
      {
        status: 422,
        statusText: 'Invalid or expired token. Try again.',
      },
    );
  }
}
