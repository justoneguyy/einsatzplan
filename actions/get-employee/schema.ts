import { z } from 'zod'

export const employeeSchema = z.object({
  username: z.string(),
  firstName: z.string({
    required_error: 'Der Vorname ist erforderlich',
    invalid_type_error: 'Der Vorname muss ein Text sein',
  }),
  lastName: z.string({
    required_error: 'Der Nachname ist erforderlich',
    invalid_type_error: 'Der Nachname muss ein Text sein',
  }),
  initials: z.string(),
  profilePicture: z.string().optional(),
  role: z.string().optional(),
  groups: z.array(z.string()).optional(),
})
