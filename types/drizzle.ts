import { palettes } from '@/lib/drizzle/schema'

export type DefaultPalette = typeof palettes.$inferInsert
export type Palette = typeof palettes.$inferSelect
