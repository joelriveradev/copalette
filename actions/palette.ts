'use server'

import type {
  GetMessages,
  StoreMessages,
  UpdatePalette,
  UpdatePaletteReturnType
} from '@/types/actions'

import { openai } from '@ai-sdk/openai'
import { generateObject } from 'ai'
import { z } from 'zod'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/drizzle/db'
import { palettes } from '@/lib/drizzle/schema'
import { DefaultPalette } from '@/types/drizzle'
import { eq, and } from 'drizzle-orm'
import { redirect } from 'next/navigation'
import { Messages } from '@/types/ai'
import { kv } from '@vercel/kv'

export const generateDemoPalette = async (data: FormData) => {
  const prompt = data.get('prompt') as string

  if (prompt) {
    const { object: palette } = await generateObject({
      model: openai('gpt-4o'),
      schema: z.object({
        name: z.string().describe('A creative name for the color palette.'),
        sentiment: z.string().describe("The sentiment of the user's message."),
        colors: z
          .array(
            z.object({
              hex: z.string().describe('A hex color code')
            })
          )
          .length(6)
      }),
      prompt: `Given the following prompt, generate a color palette based on the sentiment: ${prompt}. The name should be creative, short, and succinct. For example: "Tranquil Oasis" or "Whimsy Wonderland".`
    })

    return palette
  }
}

export const createPalette = async (data: FormData) => {
  const { userId } = auth()

  const prompt = data.get('prompt') as string
  const createdAt = new Date().toISOString()

  if (!userId) {
    throw new Error('User must be signed in to create a palette.')
  }

  const dp: DefaultPalette = {
    userId,
    public: true,
    prompt,
    createdAt
  }

  const result = await db.insert(palettes).values(dp).returning({
    id: palettes.id
  })

  if (result.length === 1) {
    const { id } = result[0]

    return redirect(`/palette/${id}?prompt=${prompt}`)
  }
}

export const getMessages = async ({ userId, paletteId }: GetMessages): Promise<Messages> => {
  return (await kv.get(`${userId}:${paletteId}`)) ?? []
}

export const storeMessages = async ({ id, userId, messages }: StoreMessages) => {
  const key = `${userId}:${id}`
  await kv.set(key, messages)
}

export const getPalette = async (id: number, userId: string) => {
  return db
    .select()
    .from(palettes)
    .where(and(eq(palettes.id, id), eq(palettes.userId, userId)))
}

export const updatePalette = async ({
  userId,
  paletteId,
  message
}: UpdatePalette): Promise<UpdatePaletteReturnType> => {
  return new Promise(async (resolve) => {
    const { role, toolInvocations } = message

    if (role === 'assistant' && toolInvocations) {
      const { args } = toolInvocations[0]
      const { name, sentiment, palette: colors } = args

      console.log({ colors })

      await db
        .update(palettes)
        .set({ name, sentiment, colors, updatedAt: new Date().toISOString() })
        .where(and(eq(palettes.userId, userId), eq(palettes.id, Number(paletteId))))

      resolve({ name, sentiment })
    }
  })
}
export const deletePalette = async (id: string) => {}

export const getPalettes = async (userId: string) => {
  return (await db.select().from(palettes).where(eq(palettes.userId, userId))).sort()
}
