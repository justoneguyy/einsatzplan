import { z } from 'zod'

import { VacationEntryDurations, VacationEntryTypes } from '@/data/enums'

export const VacationEntrySchema = z.object({
  type: z.nativeEnum(VacationEntryTypes),
  duration: z.nativeEnum(VacationEntryDurations),
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
