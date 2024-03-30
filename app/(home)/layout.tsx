import { SiteHeaderDashboard } from '@/components/site-header'

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <SiteHeaderDashboard />
      <main className='mx-6 pt-2'>{children}</main>
    </>
  )
}
