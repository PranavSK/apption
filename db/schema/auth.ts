import { bigint, pgSchema, varchar } from 'drizzle-orm/pg-core';

export const authSchema = pgSchema('auth');

export const user = authSchema.table('user', {
  id: varchar('id', { length: 15 }).primaryKey(),
  email: varchar('email', { length: 255 }).notNull(),
});

export const session = authSchema.table('session', {
  id: varchar('id', { length: 128 }).primaryKey(),
  userId: varchar('user_id', { length: 15 })
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  activeExpires: bigint('active_expires', { mode: 'number' }).notNull(),
  idleExpires: bigint('idle_expires', { mode: 'number' }).notNull(),
});

export const key = authSchema.table('key', {
  id: varchar('id', { length: 255 }).primaryKey(),
  userId: varchar('user_id', { length: 15 })
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  hashedPassword: varchar('hashed_password', { length: 255 }),
});

export const emailVerificationToken = authSchema.table('email_verification_token', {
  id: varchar('id', { length: 128 }).primaryKey(),
  expires: bigint('expires', { mode: 'number' }).notNull(),
  userId: varchar('user_id', { length: 15 })
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
});
