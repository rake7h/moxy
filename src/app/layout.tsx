import './globals.css'
import './reset.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { SideNav } from '@/components/sidebar'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Moxy',
  description: 'Moxy - Mock and Proxy any API endpoints',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className='app-layout-root'>
          <div className='app-nav'>
            <SideNav />
          </div>
          <div className='app-container'>
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
