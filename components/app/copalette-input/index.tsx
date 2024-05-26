'use client'

import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ArrowUp } from 'lucide-react'
import { createPalette } from '@/actions/palette'
import { useState } from 'react'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name?: string
  redirect?: boolean
}

export function CoPaletteInput({ className = '' }: Props) {
  const [prompt, setPrompt] = useState<string | null>(null)

  return (
    <div
      className={cn(
        'fixed left-1/2 transform -translate-x-1/2 bottom-10 w-full max-w-md mx-auto',
        className
      )}
    >
      <form
        className='relative flex items-center justify-between bg-transparent px-5'
        action={createPalette}
      >
        <Input
          name='prompt'
          type='text'
          placeholder='Type a message, see how it feels in color'
          className='rounded-lg px-4 pr-12 bg-white/80 backdrop-blur-md'
          onChange={(e) => setPrompt(e.target.value ?? null)}
          required
        />

        <Button
          type='submit'
          className='absolute right-10 rounded-full p-0 w-6 h-6 disabled:bg-neutral-400'
          disabled={!prompt}
        >
          <ArrowUp size={16} />
        </Button>
      </form>
    </div>
  )
}
