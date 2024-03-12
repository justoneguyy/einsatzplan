import { z } from 'zod'

export const CreateTask = z.object({
  title: z
    .string({
      required_error: 'Titel ist erforderlich',
      invalid_type_error: 'Titel muss ein Text sein',
    })
    .min(3, { message: 'Der Titel muss mindestens 3 Zeichen lang sein' }),
})
