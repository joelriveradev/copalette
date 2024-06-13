import { openai } from '@ai-sdk/openai'
import { StreamingTextResponse, streamText, tool } from 'ai'
import { z } from 'zod'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  const { messages } = await req.json()

  const prompt = `
    You are an assistant in a color palette generation app called Palette. Your job is to either generate color palettes based on sentiment analysis, or engage in general conversation with the user. Here are the instructions:

    1. If the user provides a text snippet within quotation marks (""), you should analyze the sentiment and generate a color palette.
    2. If the user specifies additional filters such as mood, brightness, or color scheme, include these filters in the palette generation.
    3. If the user is engaging in general chat or discussing the palettes, respond to the conversation naturally.

    Examples:

    User: "I am feeling very happy today!" with mood: joyful, brightness: high, and scheme: analogous
    Assistant: Sure! Here is a color palette based on your sentiment with the specified filters: [palette details]

    User: These colors are soothing. What do you think?
    Assistant: These colors indeed evoke a sense of calm and relaxation. They are perfect for creating a serene atmosphere.

    User: Here is a snippet: "The sunset over the ocean made me feel peaceful and content." with mood: relaxed
    Assistant: Sure! Here is a color palette based on your sentiment with the specified mood: [palette details]

    User: Tell me more about how you generate these palettes.
    Assistant: I use sentiment analysis to determine the emotions conveyed in your text, then generate a corresponding color palette using predefined rules. If you specify additional filters like mood, brightness, or color scheme, I can customize the palette further.

    User: Oh this looks great! I love the colors.
    Assistant: I'm glad you like it! Let me know if you need any more help or have any other requests.
    
    The sentiment be should descriptive. For example: "playful", "hopeful", or "empowering".
    Remember, generate a palette if you detect a text snippet within quotation marks or if there is a clear expression of emotion and filters, otherwise engage in conversation.
  `

  const initialMessage = {
    role: 'system',
    content: prompt
  }

  const result = await streamText({
    temperature: 0.7,
    presencePenalty: 0.6,
    topP: 0.9,
    model: openai('gpt-4o'),
    messages: [initialMessage, ...messages],
    tools: {
      copalette: tool({
        description: `
          A tool to determine the sentiment of the user's message,
          then generate a color palette of 6 colors based
          on the sentiment of the user's message.
        `,
        parameters: z.object({
          name: z.string(),
          sentiment: z.string().describe("The sentiment of the user's message."),
          message: z
            .string()
            .describe('A brief message to the user explaining why the palette was chosen.'),
          palette: z
            .array(
              z.object({
                hex: z.string().describe('A hex color code'),
                rgb: z.array(z.number()).length(3).describe('An RGB color code'),
                hsl: z.array(z.number()).length(3).describe('An HSL color code')
              })
            )
            .length(6)
        }),
        execute: async ({ palette, sentiment, name, message }) => {
          return {
            palette,
            sentiment,
            name,
            message
          }
        }
      })
    }
  })

  const stream = result.toAIStream()

  return new StreamingTextResponse(stream)
}
