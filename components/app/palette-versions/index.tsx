'use server'

import { cn } from '@/lib/utils'

interface Props {
  className?: string
}

export async function PaletteVersions({ className = '' }: Props) {
  return (
    <div className={cn('p-5', className)}>
      <span className='font-bold text-sm'>Versions</span>
    </div>
  )
}
