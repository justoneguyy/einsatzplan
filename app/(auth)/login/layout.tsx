import { SiteHeader } from '@/components/site-header'

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <main className='h-full'>{children}</main>
}
