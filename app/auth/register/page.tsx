import { RegisterForm } from '@/components/form/register-form'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Registrierung',
}

export default function LoginPage() {
  return <RegisterForm />
}
