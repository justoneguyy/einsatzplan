import { SiteHeader } from '@/components/site-header'

export default function TestLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className='h-full'>
      <SiteHeader />
      <main className='mx-6 py-2'>{children}</main>
      {/* <main>{children}</main>
      {/* <main className='mx-4'>{children}</main> */}
    </div>
  )
}
