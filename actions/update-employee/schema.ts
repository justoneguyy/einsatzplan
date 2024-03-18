import { z } from 'zod'

import {
  lettersAnyLangRegex,
  lettersAnyLangWithSpaceRegex,
} from '@/lib/helper/regex'

export const UpdateEmployee = z.object({
  id: z.string(),
  username: z.string(),
  firstName: z
    .string({
      required_error: 'Der Vorname ist erforderlich',
      invalid_type_error: 'Der Vorname muss ein Text sein',
    })
    .refine((value) => lettersAnyLangRegex.test(value), {
      message: 'Der Nachname darf nur Buchstaben enthalten',
    }),
  lastName: z
    .string({
      required_error: 'Der Nachname ist erforderlich',
      invalid_type_error: 'Der Nachname muss ein Text sein',
    })
    .refine((value) => lettersAnyLangWithSpaceRegex.test(value), {
      message: 'Der Nachname darf nur Buchstaben enthalten',
    }),
  initials: z.string(),
  profilePicture: z.string().optional(),
  roleId: z
    .string({
      required_error: 'Die Rolle ist erforderlich',
      invalid_type_error: 'Die Rolle muss ein Text sein',
    })
    .min(1, {
      message: 'Die Rolle ist erforderlich',
    }),
  groupIds: z
    .array(
      z.string({
        required_error: 'Die Gruppe ist erforderlich',
        invalid_type_error: 'Die Gruppe muss ein Text sein',
      })
    )
    .min(1, {
      message: 'Es ist mindestens eine Gruppe erforderlich',
    }),
})
