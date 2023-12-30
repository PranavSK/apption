import { pg } from '@lucia-auth/adapter-postgresql';
import { getTableConfig, type PgTable } from 'drizzle-orm/pg-core';
import { lucia } from 'lucia';
import { nextjs_future } from 'lucia/middleware';

import { pool } from '@/db';
import { key, session, user } from '@/db/schema/auth';

function getTableName<T extends PgTable>(table: T) {
  const { schema, name } = getTableConfig(table);
  return `"${schema}"."${name}"`;
}

export const auth = lucia({
  env: process.env.NODE_ENV === 'development' ? 'DEV' : 'PROD',
  adapter: pg(pool, {
    user: getTableName(user),
    session: getTableName(session),
    key: getTableName(key),
  }),
  middleware: nextjs_future(),
  sessionCookie: {
    expires: false,
  },
  getUserAttributes(databaseUser) {
    return {
      email: databaseUser.email,
    };
  },
});
