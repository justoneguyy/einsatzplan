import { ProfileForm } from './profile-form'
import { Separator } from '@/components/ui/separator'

export default function ProfilePage() {
  return (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-medium'>Profil</h3>
        <p className='text-sm text-muted-foreground'>
          So werden dich andere Nutzer sehen.
        </p>
      </div>
      <Separator />
      <ProfileForm />
    </div>
  )
}
