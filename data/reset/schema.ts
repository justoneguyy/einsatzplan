import { z } from 'zod'

export const ResetSchema = z.object({
  email: z.string().email({
    message: 'Die E-Mail-Adresse ist erforderlich',
  }),
})
