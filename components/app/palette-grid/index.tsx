import { Colors } from '@/types/global'
import { cn } from '@/lib/utils'

interface Props {
  colorModeSwitcher?: boolean
  colorMode?: 'hex' | 'rgb' | 'hsl'
  className?: string
  colors: Colors
}

export function PaletteGrid({ colors, className, colorMode = 'hex' }: Props) {
  return (
    <div className={cn('w-full h-full', className)}>
      <div className='grid gap-2.5 h-full grid-cols-2 grid-rows-3 md:grid-cols-3 md:grid-rows-2'>
        {colors.map((color, i) => {
          let value =
            colorMode === 'rgb' || colorMode === 'hsl'
              ? color[colorMode]?.join(', ')
              : color[colorMode]

          if (colorMode === 'hex' && !value?.includes('#')) {
            value = `#${value}`
          }

          if (colorMode === 'rgb') {
            value = `rgb(${value})`
          }

          return (
            <div
              key={i}
              className='flex items-center md:items-end justify-center col-span-1 rounded-xl transition-all h-full'
              style={{ backgroundColor: value }}
            >
              <p className='md:mb-3 text-sm'>{value}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
