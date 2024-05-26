import { getPalette } from '@/actions/palette'
import { auth } from '@clerk/nextjs/server'
import { PaletteChat } from '@/components/app/chat'
import { PaletteFilters } from '@/components/app/palette-filters'
import { getMessages } from '@/actions/palette'

interface Props {
  params: {
    id: string
  }
}

export default async function PalettePage({ params }: Props) {
  const { userId } = auth()

  const palette = await getPalette(parseInt(params.id), userId!)
  const history = await getMessages({ userId: userId!, paletteId: params.id })

  return (
    <main className='w-full h-[calc(100dvh-109px)] grid md:grid-flow-col auto-cols-fr max-w-7xl mx-auto p-0'>
      <PaletteChat
        className='col-span-12 md:col-span-8 xl:col-span-7 px-6 xl:border-l xl:border-l-neutral-200'
        id={params.id}
        palette={palette[0]}
        history={history}
      />

      <PaletteFilters className='col-span-12 md:col-span-4 xl:col-span-3 border-x border-x-neutral-200' />
    </main>
  )
}
