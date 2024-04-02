import { z } from 'zod'

import {
  lettersAnyLangRegex,
  lettersAnyLangWithSpaceRegex,
} from '@/lib/helper/regex'
import { optionSchema } from '../schema'

export const UserSchema = z.object({
  firstName: z
    .string()
    .min(1, {
      message: 'Der Vorname ist erforderlich',
    })
    .refine((value) => lettersAnyLangRegex.test(value), {
      message: 'Der Nachname darf nur Buchstaben enthalten',
    }),
  lastName: z
    .string()
    .min(1, {
      message: 'Der Nachname ist erforderlich',
    })
    .refine((value) => lettersAnyLangWithSpaceRegex.test(value), {
      message: 'Der Nachname darf nur Buchstaben enthalten',
    }),
  email: z.string().email({
    message: 'Die E-Mail-Adresse ist erforderlich',
  }),
  initials: z.string(),
  profilePicture: z.string().optional(),
  roleId: z.string().min(1, {
    message: 'Die Rolle ist erforderlich',
  }),
  groupIds: z.array(optionSchema).min(1, {
    message: 'Es ist mindestens eine Gruppe erforderlich',
  }),
})

export const UserUpdateSchema = z.object({
  id: z.string(),
  firstName: z
    .string()
    .min(1, {
      message: 'Der Vorname ist erforderlich',
    })
    .refine((value) => lettersAnyLangRegex.test(value), {
      message: 'Der Nachname darf nur Buchstaben enthalten',
    }),
  lastName: z
    .string()
    .min(1, {
      message: 'Der Nachname ist erforderlich',
    })
    .refine((value) => lettersAnyLangWithSpaceRegex.test(value), {
      message: 'Der Nachname darf nur Buchstaben enthalten',
    }),
  email: z.string().email({
    message: 'Die E-Mail-Adresse ist erforderlich',
  }),
  initials: z.string(),
  profilePicture: z.string().nullable(),
  roleId: z.string().min(1, {
    message: 'Die Rolle ist erforderlich',
  }),
  groupIds: z.array(optionSchema).min(1, {
    message: 'Es ist mindestens eine Gruppe erforderlich',
  }),
})

export const UserDeleteSchema = z.object({
  id: z.string(),
})
