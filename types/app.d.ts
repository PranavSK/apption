/* eslint-disable @typescript-eslint/consistent-type-imports */
/// <reference types="lucia" />
declare namespace Lucia {
  type Auth = typeof import('@/lib/auth').auth;
  type DatabaseUserAttributes = Omit<typeof import('@/db/schema/auth').user.$inferInsert, 'id'>;
  type DatabaseSessionAttributes = Omit<
    typeof import('@/db/schema/auth').session.$inferInsert,
    'id' | 'userId' | 'activeExpires' | 'idleExpires'
  >;
}
