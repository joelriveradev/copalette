import type { LayoutProps } from '@/types/global'
import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { auth } from '@clerk/nextjs/server'
import { Grip } from 'lucide-react'

import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'

import Link from 'next/link'
import '@/app/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CoPalette',
  description: 'AI-powered color palettes generated from sentiment analysis.'
}

export default function RootLayout({ children }: LayoutProps) {
  const { userId } = auth()

  return (
    <html lang='en'>
      <body className={inter.className}>
        <div>
          <header className='w-full py-5 px-12 lg:px-24 absolute top left-0 z-10'>
            <nav className='max-w-7xl mx-auto flex items-center justify-between'>
              <Link href='/' className='font-bold'>
                CoPalette
              </Link>

              {userId ? (
                <HoverCard openDelay={0}>
                  <HoverCardTrigger>
                    <Grip size={24} />
                  </HoverCardTrigger>

                  <HoverCardContent className='border-0 bg-black text-white p-2 px-3 rounded-full text-xs inline-block w-auto'>
                    View Palettes
                  </HoverCardContent>
                </HoverCard>
              ) : (
                <Link href='/palettes'>Sign in</Link>
              )}
            </nav>
          </header>
          {children}
        </div>
      </body>
    </html>
  )
}
