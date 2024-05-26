import { Globe, Sparkle, ChevronRight } from 'lucide-react'
import { auth } from '@clerk/nextjs/server'
import { CoPaletteInput } from '@/components/app/copalette-input'
import { getPalettes } from '@/actions/palette'
import { useRelativeTime } from '@/app/utils'

import Link from 'next/link'
import { Colors } from '@/types/global'

export default async function PalettesPages() {
  const { userId } = auth()

  const palettes = await getPalettes(userId!)

  return (
    <main className='relative px-7 pr-6 2xl:p-0'>
      <section className='min-h-96 my-16'>
        <div className='w-full max-w-7xl mx-auto'>
          <header className='w-full flex items-center justify-between'>
            <h1 className='flex items-center'>
              Discover <Globe className='ml-3' size={20} />
            </h1>

            <Link href='/discover' className='flex items-center text-sm'>
              View all <ChevronRight className='text-current ml-2' size={20} />
            </Link>
          </header>

          <div className='w-full grid grid-cols-1 md:grid-cols-3 gap-6 gap-y-12 mt-16 '>
            {palettes
              .sort((a, b) => {
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
              })
              .filter((p) => p.name)
              .map(({ id, colors, name, createdAt }) => {
                const time = useRelativeTime(createdAt)

                return (
                  <Link href={`/palette/${id}`} key={id}>
                    <div className='w-full rounded-md'>
                      <p className='text-sm antialiased mb-2'>{name}</p>
                      <div className='w-full flex items-center justify-between'>
                        {(colors as Colors).map(({ hex }) => {
                          return (
                            <div
                              key={hex}
                              className='w-full h-14 rounded-md mr-2'
                              style={{ backgroundColor: hex }}
                            />
                          )
                        })}
                      </div>

                      <small className='capitalize mt-2 text-neutral-500'>{time}</small>
                    </div>
                  </Link>
                )
              })}
          </div>
        </div>
      </section>
      <CoPaletteInput />
    </main>
  )
}
