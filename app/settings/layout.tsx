import { SidebarNav } from '@/app/settings/components/sidebar-nav'
import { SiteHeader } from '@/components/site-header'
import { Separator } from '@/components/ui/separator'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Einstellungen',
}

export default function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <SiteHeader />
      <div className='mx-6 pt-6'>
        <main className=''>{children}</main>
      </div>
    </>
  )
}

// TODO: maybe use this later when the other settings pages are implemented
// import { SidebarNav } from '@/app/settings/components/sidebar-nav'
// import { SiteHeader } from '@/components/site-header'
// import { Separator } from '@/components/ui/separator'
// import { Metadata } from 'next'

// export const metadata: Metadata = {
//   title: 'Einstellungen',
//   description: 'Verwalte dein Benutzerkonto und setze E-Mail-Präferenzen.',
// }

// const sidebarNavItems = [
//   {
//     title: 'Profil',
//     href: '/settings',
//   },
//   {
//     title: 'Darstellung',
//     href: '/settings/appearance',
//   },
//   {
//     title: 'Benachrichtigungen',
//     href: '/settings/notifications',
//   },
//   {
//     title: 'Mitarbeiterverwaltung',
//     href: '/settings/employee-administration',
//   },
// ]

// export default function SettingsLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode
// }>) {
//   return (
//     <>
//       <SiteHeader />
//       <div className='container flex space-x-10 pt-16'>
//         <aside className=''>
//           <SidebarNav items={sidebarNavItems} />
//         </aside>
//         <main className='flex-1'>{children}</main>
//       </div>
//     </>
//   )
// }
