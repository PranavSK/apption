import { Pool } from '@neondatabase/serverless';
import { drizzle as drizzleServerless } from 'drizzle-orm/neon-serverless';

// import { migrate } from 'drizzle-orm/neon-serverless/migrator';
import { env } from '@/env';

import { schema } from './schema';

export const pool = new Pool({ connectionString: env.DATABASE_URL });

export const db = drizzleServerless(pool, { schema });

// console.log('🚀 Migrating database...');
// migrate(db, { migrationsFolder: 'db/migrations' })
//   .then(() => console.log('✅ Database migrated'))
//   .catch((error) => console.error('❌ Database migration failed\n', error));
