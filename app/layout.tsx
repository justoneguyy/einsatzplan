import { CustomToast, Toast } from '@/components/ui/toast'
import { ThemeProvider } from '@/lib/provider/theme-provider'
import { cn } from '@/lib/utils'
import { fontSans } from '@/styles/font'
import '@/styles/globals.css'
import type { Metadata } from 'next'

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
          <Toast />
        </ThemeProvider>
      </body>
    </html>
  )
}
