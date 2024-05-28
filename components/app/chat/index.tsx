'use client'

import type { Palette } from '@/types/drizzle'
import type { Colors } from '@/types/global'
import type { Messages } from '@/types/ai'

import { useEffect, useCallback, useRef, useState, startTransition } from 'react'
import { useChat } from 'ai/react'
import { useSearchParams } from 'next/navigation'
import { ArrowUp, Square } from 'lucide-react'
import { useUser } from '@clerk/nextjs'
import { useAtomValue } from 'jotai'
import { Element, scroller } from 'react-scroll'

import { cn } from '@/lib/utils'
import { Show } from '@/components/app/show'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { PaletteGrid } from '@/components/app/palette-grid'
import { storeMessages, updatePalette } from '@/actions/palette'
import { ToneFilterState, BrightnessFilterState, SchemeFilterState } from '@/app/state/filters'

import Markdown from 'react-markdown'

interface Props {
  id: string
  palette: Palette
  className?: string
  history?: Messages
}

export function PaletteChat({ id, className = '', palette, history = [] }: Props) {
  const toneFilter = useAtomValue(ToneFilterState)
  const brightnessFilter = useAtomValue(BrightnessFilterState)
  const schemeFilter = useAtomValue(SchemeFilterState)

  const searchParams = useSearchParams()
  const prompt = searchParams.get('prompt')
  const promptRef = useRef<HTMLInputElement>(null)

  const [messageCount, setMessageCount] = useState(history.length)
  const [name, setName] = useState(palette.name)
  const [sentiment, setSentiment] = useState(palette.sentiment)

  const { user } = useUser()

  const { messages, input, setInput, handleInputChange, handleSubmit, append, isLoading, stop } =
    useChat({
      id,
      initialMessages: history
    })

  const scrollToBottom = useCallback(() => {
    scroller.scrollTo('anchor', {
      smooth: 'easeOutQuint',
      containerId: 'messages',
      isDyanmic: true
    })
  }, [])

  useEffect(() => {
    if (!prompt) return

    if (history.length === 0) {
      append({ role: 'user', content: prompt })
    }
  }, [])

  const runEffectAsync = async () => {
    if (isLoading || messages.length < 2 || !user) return

    if (messages.length === 2 && !name && !sentiment) {
      // Update the palette name and sentiment
      // as soon as we get the first tool invocation
      const { name, sentiment } = await updatePalette({
        userId: user.id,
        paletteId: id,
        message: messages[1]
      })

      startTransition(async () => {
        setName(name)
        setSentiment(sentiment)
      })
    } else {
      if (messages.length > messageCount && history.length !== messages.length) {
        await storeMessages({ userId: user.id, id, messages })

        await updatePalette({
          userId: user.id,
          paletteId: id,
          message: messages[messages.length - 1]
        })
        setMessageCount(messages.length)
      }
    }
  }

  useEffect(() => {
    window.addEventListener('apply-filters', () => {
      if (promptRef.current) {
        const prompt = `Apply these filters: tone=${toneFilter}, brightness=${brightnessFilter}, scheme=${schemeFilter}.`

        promptRef.current.value = prompt
        setInput(prompt)
      }
    })
  }, [toneFilter, brightnessFilter, schemeFilter])

  useEffect(() => {
    scrollToBottom()
    if (messages.length > 0) runEffectAsync()
  }, [messages, isLoading])

  return (
    <div className={cn(className, 'min-h-[calc(100dvh-69px)] flex flex-col w-full mx-auto')}>
      <div
        id='messages'
        className='w-full min-h-[calc(100dvh-133px)] max-w-2xl mx-auto overflow-scroll relative pt-8 pb-3'
      >
        {messages.map(({ id, role, content, toolInvocations, tool_call_id }, i) => {
          const isChatGPT = role === 'assistant'

          return (
            <div key={id} className='w-full mb-10'>
              <div className='flex items-center mb-1 text-sm'>
                <strong>{isChatGPT ? 'Assistant' : 'You'}</strong>
              </div>

              <Show when={role !== 'data'}>
                <div key={i} className={cn('antialiased mb-4 last:mb-0 text-neutral-600')}>
                  <Show when={isChatGPT}>
                    <Markdown className='text-pretty'>{content}</Markdown>
                  </Show>

                  <Show when={!isChatGPT}>
                    <p>{content}</p>
                  </Show>
                </div>

                <Show when={!!toolInvocations}>
                  {toolInvocations?.map((toolInvocation, i) => {
                    const { args } = toolInvocation

                    return (
                      <div className='mb-5' key={`${tool_call_id}--${i}`}>
                        <div>
                          <PaletteGrid className='h-96' colors={args.palette as Colors} />

                          <p className='mt-4 text-neutral-600 antialiased'>{args.message}</p>
                        </div>
                      </div>
                    )
                  })}
                </Show>
              </Show>
            </div>
          )
        })}

        <Show when={isLoading}>
          <p className='text-neutral-600'>Loading...</p>
        </Show>

        <Element name='anchor' />
      </div>

      <form
        className='flex items-center justify-between p-2 pb-4 bg-white/20'
        onSubmit={handleSubmit}
      >
        <div className='w-full relative flex items-center max-w-2xl mx-auto justify-between'>
          <Input
            type='text'
            placeholder='Type a message, see how it feels in color'
            className='rounded-lg px-4 shadow-sm backdrop-blur-md bg-transparent pr-12'
            onChange={handleInputChange}
            value={input}
            ref={promptRef}
            required
          />

          <Show when={!isLoading}>
            <Button
              type='submit'
              className='absolute right-4 rounded-full p-0 w-6 h-6 disabled:bg-neutral-400'
              disabled={!input}
            >
              <ArrowUp size={16} />
            </Button>
          </Show>

          <Show when={isLoading}>
            <Button
              type='button'
              className='absolute right-4 rounded-full p-0 w-6 h-6'
              onClick={stop}
            >
              <Square size={15} />
            </Button>
          </Show>
        </div>
      </form>
    </div>
  )
}
