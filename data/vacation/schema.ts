import { z } from 'zod'

import { VacationDurations, VacationTypes } from '@/data/enums'

export const VacationCreateSchema = z.object({
  type: z.nativeEnum(VacationTypes),
  duration: z.nativeEnum(VacationDurations),
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

export const VacationUpdateSchema = z.object({
  id: z.string(),
  type: z.nativeEnum(VacationTypes),
  duration: z.nativeEnum(VacationDurations),
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

export const VacationDeleteSchema = z.object({
  id: z.string(),
})
