export * from './schema/index';

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  fullName: text('full_name').notNull(),
  email: text('email').notNull().unique(),
  phone: text('phone').notNull(),
  college: text('college').notNull(),
  branch: text('branch').notNull(),
  year: integer('year').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

import { pgTable, uuid, text, integer, timestamp } from 'drizzle-orm/pg-core';
