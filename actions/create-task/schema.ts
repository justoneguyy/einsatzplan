import { z } from 'zod'

export const CreateTask = z.object({
  title: z.string({
    required_error: 'Der Titel ist erforderlich',
    invalid_type_error: 'Der Titel muss ein Text sein',
  }),
  description: z.string().nullable(),
  dateFrom: z.date(),
  dateTo: z.date(),
  timeFrom: z.string().nullable(),
  timeTo: z.string().nullable(),
  userIds: z
    .array(
      z.string({
        required_error: 'Der Mitarbeiter ist erforderlich',
        invalid_type_error: 'Die Mitarbeiter muss ein Text sein',
      })
    )
    .min(1, {
      message: 'Es ist mindestens eine Mitarbeiter erforderlich',
    }),
})
