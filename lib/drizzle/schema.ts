import { pgTable, serial, text, varchar, boolean, jsonb, date } from 'drizzle-orm/pg-core'

export const palettes = pgTable('palettes', {
  id: serial('id').primaryKey(),
  userId: text('userId').notNull(),
  name: varchar('name', { length: 255 }),
  prompt: text('prompt'),
  colors: jsonb('colors'),
  sentiment: varchar('sentiment', { length: 50 }),
  public: boolean('public').notNull().default(false),
  createdAt: text('createdAt').notNull(),
  updatedAt: text('updatedAt')
})
