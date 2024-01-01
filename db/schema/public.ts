import {
  boolean,
  foreignKey,
  pgTable,
  text,
  timestamp,
  unique,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

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

export const workspace = pgTable(
  'workspace',
  {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' }).defaultNow().notNull(),
    owner: varchar('owner', { length: 15 })
      .references(() => user.id, { onDelete: 'cascade' })
      .notNull(),
    name: text('name').notNull(),
    icon: text('icon').notNull(),
    inTrash: boolean('in_trash').default(false),
  },
  (table) => ({
    uniqueForUser: unique().on(table.owner, table.name),
  }),
);

export const document = pgTable(
  'document',
  {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' }).defaultNow().notNull(),
    workspaceId: uuid('workspace_id')
      .references(() => workspace.id, { onDelete: 'cascade' })
      .notNull(),
    // Using foreignKey helper since typescript doesn't identify self references
    parentId: uuid('parent_id'),
    name: text('name').notNull(),
    content: text('content'),
    bannerUrl: text('banner_url'),
    inTrash: boolean('in_trash').default(false),
  },
  (table) => ({
    uniqueForWorkspace: unique().on(table.workspaceId, table.name),
    parentReference: foreignKey({ columns: [table.parentId], foreignColumns: [table.id] }),
  }),
);
