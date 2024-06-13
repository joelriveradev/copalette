import type { LayoutProps } from '@/types/global'
import { ClerkProvider } from '@clerk/nextjs'
import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { UserButton } from '@clerk/nextjs'
import { Grip } from 'lucide-react'

import Link from 'next/link'
import '@/app/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CoPalette',
  description: 'AI-powered color palettes generated from sentiment analysis.'
}

// This is the layout for protected routes.
// It has different styles than the one on the landing page,
// and features the user button for authenticated users.
// This is preferrable to having to dynamically
// swap out the header based on the route, which
// tends to cause CLS (cumulative layout shift) issues.

export default function RootLayout({ children }: LayoutProps) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body className={inter.className}>
          <div>
            <header className='w-full border-b border-b-neutral-200 py-5 px-6 2xl:px-0'>
              <nav className='w-full max-w-7xl mx-auto flex items-center justify-between'>
                <Link href='/' className='font-bold'>
                  CoPalette
                </Link>

                <div className='flex items-center'>
                  <Link href='/palettes' className='mr-4'>
                    <Grip size={20} />
                  </Link>
                  <UserButton />
                </div>
              </nav>
            </header>
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  )
}
