import { palettes, messages } from '@/lib/drizzle/schema'

export type DefaultPalette = typeof palettes.$inferInsert
export type Palette = typeof palettes.$inferSelect
export type PaletteMessage = typeof messages.$inferSelect
