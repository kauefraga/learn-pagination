import { integer, pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const UsersTable = pgTable('users', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  name: varchar('name', { length: 50 }).unique().notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const PostsTable = pgTable('posts', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  publicId: uuid('public_id').unique().notNull().defaultRandom(),
  userId: integer('user_id').notNull().references(() => UsersTable.id, { onDelete: 'cascade' }),
  text: text('text').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});
