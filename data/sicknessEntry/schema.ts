import { z } from 'zod'

import { SicknessEntryTitles } from '@/data/enums'

export const SicknessEntryCreateSchema = z.object({
  title: z.nativeEnum(SicknessEntryTitles),
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

export const SicknessEntryUpdateSchema = z.object({
  id: z.string(),
  title: z.nativeEnum(SicknessEntryTitles),
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

export const SicknessEntryDeleteSchema = z.object({
  id: z.string(),
})
