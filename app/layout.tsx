import type { Metadata } from 'next'
import '@/styles/globals.css'
import { cn } from '@/lib/utils'
import { SiteHeader } from '@/components/site-header'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { fontSans } from '@/styles/font'

// TODO: replace later on with config/site.ts
// TODO: change title on all pages?
export const metadata: Metadata = {
  title: 'Einsatzplanungssystem',
  description: 'Einsatzplanungssystem für Uhlhorn',
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
          fontSans.className
        )}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster expand />
        </ThemeProvider>
      </body>
    </html>
  )
}
