import './globals.css'
import './reset.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { TopNav } from '@/components/sidebar'
import {NextUIProvider} from "@nextui-org/system";

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
            <TopNav />
          </div>
          <div className='app-container'>
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
