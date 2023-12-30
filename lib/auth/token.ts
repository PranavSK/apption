import { eq } from 'drizzle-orm';
import { generateRandomString, isWithinExpiration } from 'lucia/utils';

import { db } from '@/db';
import { emailVerificationToken } from '@/db/schema/auth';

import { CustomError } from '../error';

const EXPIRES_IN = 1000 * 60 * 60 * 2; // 2 hours

export async function generateAuthToken(userId: string) {
  const storedUserTokens = await db.query.emailVerificationToken.findMany({
    where(fields, { eq }) {
      return eq(fields.userId, userId);
    },
  });
  if (storedUserTokens.length > 0) {
    const reusableToken = storedUserTokens.find((token) =>
      // check if expiration is within 1 hour
      // and reuse the token if true
      isWithinExpiration(token.expires - EXPIRES_IN / 2),
    );
    if (reusableToken) {
      return reusableToken.id;
    }
  }

  const token = generateRandomString(63);
  await db.insert(emailVerificationToken).values({
    id: token,
    userId,
    expires: Date.now() + EXPIRES_IN,
  });

  return token;
}

export async function validateAuthToken(token: string) {
  const storedToken = await db.query.emailVerificationToken.findFirst({
    where(fields, { eq }) {
      return eq(fields.id, token);
    },
  });
  if (!storedToken) {
    throw new InvalidTokenError();
  }
  if (!isWithinExpiration(storedToken.expires)) {
    throw new TokenExpiredError();
  }
  // If token is valid, delete all tokens of this user from the database
  await db
    .delete(emailVerificationToken)
    .where(eq(emailVerificationToken.userId, storedToken.userId));
  return storedToken.userId;
}

export class InvalidTokenError extends CustomError {
  constructor() {
    super('Invalid token');
  }
}

export class TokenExpiredError extends CustomError {
  constructor() {
    super('Token expired');
  }
}
