import { ResetForm } from '@/components/form/reset-form'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Reset Passwort',
}

export default function ResetPage() {
  return <ResetForm />
}
