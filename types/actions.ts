import type { Message } from 'ai'

export interface GetMessages {
  userId: string
  paletteId: string
}

export interface StoreMessages {
  id: string
  userId: string
  messages: Message[]
}

export interface UpdatePalette {
  userId: string
  paletteId: string
  message: Message
}

export interface UpdatePaletteReturnType {
  name: string
  sentiment: string
}
