'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ArrowRight, RefreshCw } from 'lucide-react'
import { useState, startTransition, useRef } from 'react'
import { DemoPalettes, Palette } from '@/types/global'
import { PaletteGrid } from '@/components/app/palette-grid'

export default function LandingPage() {
  let [active, setActive] = useState(false)
  let [prompt, setPrompt] = useState<string | null>(null)
  let [palette, setPalette] = useState<Palette>(DemoPalettes[0])

  let inputRef = useRef<HTMLInputElement>(null)

  const handleFocus = () => setActive(true)

  let handleBlur = () => {
    startTransition(() => {
      setActive(false)
      setPrompt(null)

      if (inputRef.current) {
        inputRef.current.value = ''
      }
    })
  }

  let handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value ?? null)
  }

  let cyclePalette = () => {
    let index = DemoPalettes.indexOf(palette)
    let nextIndex = index + 1

    if (nextIndex >= DemoPalettes.length) nextIndex = 0
    setPalette(DemoPalettes[nextIndex])
  }

  return (
    <main className='relative h-dvh p-12 lg:p-24'>
      <div className='flex items-center justify-between h-full max-w-7xl mx-auto'>
        <div className='w-full xl:w-1/2'>
          <h1 className='font-extrabold text-4xl md:text-5xl lg:text-6xl max-w-xl mt-20'>
            Color your vision, amplify your brand.
          </h1>

          <p className='antialiased max-w-lg my-10 text-neutral-600'>
            We use sentiment analysis to create color palettes that perfectly capture your brand's
            voice and tone.
          </p>

          <form>
            <div className='relative bg-transparent w-[118px] flex items-center has-[:focus]:w-full lg:has-[:focus]:w-96 transition-all'>
              <Input
                ref={inputRef}
                className='peer rounded-full bg-transparent shrink-0 py-6 px-6 focus:pr-14 w-[118px] hover:cursor-pointer focus:cursor-text border-black placeholder:text-black placeholder:font-bold focus:w-full lg:focus:w-96 focus:placeholder:font-normal focus:placeholder:text-neutral-500 transition-all'
                type='text'
                placeholder={active ? "Enter your brand's mission statement" : 'Try it out!'}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={handleChange}
                required
              />

              <Button
                type='submit'
                className='absolute rounded-full w-10 h-10 scale-0 hidden peer-focus:flex peer-focus:right-2 peer-focus:scale-100 disabled:bg-neutral-400 transition-all'
                disabled={!prompt}
              >
                <ArrowRight className='shrink-0' size={18} />
              </Button>
            </div>
          </form>
        </div>

        <div className='hidden scale-90 w-1/2 h-[calc(100dvh/2)] flex-col items-center xl:flex'>
          <PaletteGrid colors={palette.colors} />

          <Button
            onClick={cyclePalette}
            variant='ghost'
            className='text-sm antialiased max-w-sm mx-auto mt-3'
          >
            <RefreshCw size={16} className='mr-2' /> "{palette.sentiment}"
          </Button>
        </div>
      </div>
    </main>
  )
}
