import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import '@/styles/globals.css'
import { cn } from '@/lib/utils'
import { SiteHeader } from '@/components/site-header'
import { ThemeProvider } from '@/components/theme-provider'

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
      <body className={cn('bg-background antialiased', GeistSans.className)}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
    // <html lang='de'>
    //   <body
    //     className={cn(
    //       'min-h-screen bg-background antialiased',
    //       GeistSans.className
    //     )}
    //   >
    //     <ThemeProvider
    //       attribute='class'
    //       defaultTheme='system'
    //       enableSystem
    //       disableTransitionOnChange
    //     >
    //       <div className='relative flex min-h-screen flex-col'>
    //         <SiteHeader />
    //         <main className='relative mx-6 flex-1 py-8'>{children}</main>
    //       </div>
    //     </ThemeProvider>
    //   </body>
    // </html>
  )
}
