import { z } from 'zod'

export const RegisterSchema = z.object({
  firstName: z.string().min(1, {
    message: 'Der Vorname ist erforderlich',
  }),
  lastName: z.string().min(1, {
    message: 'Der Nachname ist erforderlich',
  }),
  username: z.string().min(1, {
    message: 'Der Benutzername ist erforderlich',
  }),
  email: z.string().email({
    message: 'Die E-Mail-Adresse ist erforderlich',
  }),
  password: z.string().min(8, {
    message: 'Das Passwort muss mindestens 8 Zeichen lang sein',
  }),
})
