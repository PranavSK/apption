import { pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

import { user } from './auth';

export const profile = pgTable('user_profile', {
  id: varchar('id', { length: 15 })
    .primaryKey()
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
  username: text('username').unique().notNull(),
  fullName: text('full_name'),
  avatarUrl: text('avatar_url'),
  website: text('website'),
});

export const workspace = pgTable('workspace', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
  owner: varchar('owner', { length: 15 })
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  icon: text('icon').notNull(),
});
