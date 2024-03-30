import Background from '@/components/background'

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className='flex h-full items-center justify-center'>
      <Background>{children}</Background>
    </main>
  )
}
