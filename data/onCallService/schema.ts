import { z } from 'zod'

export const OnCallServiceSchema = z.object({
  date: z
    .object({
      from: z.date(),
      to: z.date(),
    })
    .refine((data) => data.from && data.to, {
      message: 'Das Datum ist erforderlich',
    }),
  userId: z.string().min(1, {
    message: 'Der Benutzer ist erforderlich',
  }),
})
