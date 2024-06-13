'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ArrowRight, RefreshCw } from 'lucide-react'
import { useState, startTransition, useRef } from 'react'
import { DemoPalettes, Palette } from '@/types/global'
import { PaletteGrid } from '@/components/app/palette-grid'
import { generateDemoPalette } from '@/actions/palette'
import { cn } from '@/lib/utils'

export default function LandingPage() {
  let [active, setActive] = useState(false)
  let [prompt, setPrompt] = useState<string | null>(null)
  let [palette, setPalette] = useState<Palette>(DemoPalettes[0])
  let [loading, setLoading] = useState(false)

  let inputRef = useRef<HTMLInputElement>(null)

  const handleFocus = () => setActive(true)

  let handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value ?? null)
  }

  let handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (prompt) {
      const formdata = new FormData()
      formdata.append('prompt', prompt)

      setLoading(true)
      const result: Palette | undefined = await generateDemoPalette(formdata)

      if (result) {
        startTransition(() => {
          setPalette(result)
          setLoading(false)
        })
      }
    }
  }

  let cyclePalette = () => {
    let index = DemoPalettes.indexOf(palette)
    let nextIndex = index + 1

    if (nextIndex >= DemoPalettes.length) {
      nextIndex = 0
    }
    setPalette(DemoPalettes[nextIndex])
  }

  return (
    <main className='relative h-full lg:h-dvh p-12 pb-24 lg:p-24'>
      <div className='lg:flex lg:items-center lg:justify-between max-w-7xl mx-auto'>
        <div className='w-full lg:w-1/2'>
          <h1 className='font-extrabold text-4xl md:text-5xl xl:text-[55px] max-w-xl mt-20'>
            Color your vision, amplify your brand.
          </h1>

          <p className='antialiased max-w-lg my-10 text-neutral-600'>
            We use sentiment analysis to create color palettes that perfectly capture your brand's
            voice and tone.
          </p>

          <form onSubmit={handleSubmit}>
            <div className='relative bg-transparent w-full lg:w-96 xl:w-[500px] flex items-center transition-all'>
              <Input
                ref={inputRef}
                className='rounded-full bg-transparent shrink-0 py-6 px-6 focus:pr-14 w-full lg:w-96 xl:w-[500px] hover:cursor-pointer focus:cursor-text border-black focus:placeholder:text-neutral-500 transition-all'
                type='text'
                placeholder='Type a message, see how it feels in color'
                onChange={handleChange}
                required
              />

              <Button
                type='submit'
                className='absolute rounded-full w-10 h-10 right-1.5 disabled:bg-neutral-400 transition-all'
                disabled={!prompt}
              >
                <ArrowRight className='shrink-0' size={18} />
              </Button>
            </div>
          </form>
        </div>

        <div className='lg:w-1/2 h-[calc(100dvh/2)] mt-12 flex-col items-start'>
          <PaletteGrid colors={palette.colors} />

          <Button
            onClick={cyclePalette}
            variant='ghost'
            className='text-sm antialiased max-w-sm mx-auto mt-3 rounded-full'
          >
            <RefreshCw
              size={16}
              className={cn('mr-2', {
                'animate-spin': loading
              })}
            />{' '}
            {loading ? 'Generating palette...' : `"${palette.name}"`}
          </Button>
        </div>
      </div>
    </main>
  )
}
