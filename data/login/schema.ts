import { z } from 'zod'

export const LoginSchema = z.object({
  email: z.string().email({
    message: 'Die E-Mail-Adresse ist erforderlich',
  }),
  password: z.string().min(1, {
    message: 'Das Passwort ist erforderlich',
  }),
  code: z.optional(z.string()),
})
