import {
  SicknessEntryTitles,
  VacationEntryDurations,
  VacationEntryTypes,
} from '@/data/enums'
import {
  lettersAnyLangRegex,
  lettersAnyLangWithSpaceRegex,
} from '@/lib/helper/regex'
import { z } from 'zod'

export const LoginSchema = z.object({
  email: z.string().email({
    message: 'Die E-Mail-Adresse ist erforderlich',
  }),
  password: z.string().min(1, {
    message: 'Das Passwort ist erforderlich',
  }),
  code: z.optional(z.string()),
})

export const RegisterSchema = z.object({
  firstName: z.string().min(1, {
    message: 'Der Vorname ist erforderlich',
  }),
  lastName: z.string().min(1, {
    message: 'Der Nachname ist erforderlich',
  }),
  username: z.string().min(1, {
    message: 'Der Benutzername ist erforderlich',
  }),
  email: z.string().email({
    message: 'Die E-Mail-Adresse ist erforderlich',
  }),
  password: z.string().min(8, {
    message: 'Das Passwort muss mindestens 8 Zeichen lang sein',
  }),
})

export const ResetSchema = z.object({
  email: z.string().email({
    message: 'Die E-Mail-Adresse ist erforderlich',
  }),
})

const optionSchema = z.object({
  value: z.string(),
  label: z.string(),
  disable: z.boolean().optional(),
})

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
  timeFrom: z.string().optional(),
  timeTo: z.string().optional(),
  userIds: z.array(optionSchema).min(1, {
    message: 'Es ist mindestens Benutzer erforderlich',
  }),
})

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

export const SicknessEntrySchema = z.object({
  title: z.nativeEnum(SicknessEntryTitles),
  date: z
    .object({
      from: z.date(),
      to: z.date(),
    })
    .refine((data) => data.from && data.to, {
      message: 'Das Datum ist erforderlich',
    }),
  timeFrom: z.string().nullable(),
  timeTo: z.string().nullable(),
  userId: z.string().min(1, {
    message: 'Der Benutzer ist erforderlich',
  }),
})
