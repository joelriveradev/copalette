import type { LayoutProps } from '@/types/global'
import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { auth } from '@clerk/nextjs/server'

import Link from 'next/link'
import '@/app/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CoPalette',
  description: 'AI-powered color palettes generated from sentiment analysis.'
}

// This is the layout for public routes.
// The header has different styles than the one for protected routes,
// and features the sign-in button for unauthenticated users.
// This is preferrable to having to dynamically
// swap out the header based on the route, which
// tends to cause CLS (cumulative layout shift) issues.

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
                <Link href='/palettes' className='text-sm hover:underline hover:underline-offset-4'>
                  Explore
                </Link>
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
