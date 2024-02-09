import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import '@/styles/globals.css'
import { cn } from '@/lib/utils'

// replace later on with config/site.ts
export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='de'>
      <body
        className={cn(
          'min-h-screen bg-background antialiased',
          GeistSans.className
        )}
      >
        <main>{children}</main>
      </body>
    </html>
  )
}
