import { z } from 'zod'
import { optionSchema } from '../schema'

export const TaskSchema = z.object({
  title: z.string().min(1, {
    message: 'Der Titel ist erforderlich',
  }),
  description: z.string().nullable(),
  date: z
    .object({
      from: z.date(),
      to: z.date(),
    })
    .refine((data) => data.from && data.to, {
      message: 'Das Datum ist erforderlich',
    }),
  userIds: z.array(optionSchema).min(1, {
    message: 'Es ist mindestens ein Benutzer erforderlich',
  }),
})

export const TaskUpdateSchema = z.object({
  id: z.string(),
  title: z.string().min(1, {
    message: 'Der Titel ist erforderlich',
  }),
  description: z.string().nullable(),
  date: z
    .object({
      from: z.date(),
      to: z.date(),
    })
    .refine((data) => data.from && data.to, {
      message: 'Das Datum ist erforderlich',
    }),
  userIds: z.array(optionSchema).min(1, {
    message: 'Es ist mindestens ein Benutzer erforderlich',
  }),
})

export const TaskDeleteSchema = z.object({
  id: z.string(),
})
