import { z } from 'zod'

export const optionSchema = z.object({
  value: z.string(),
  label: z.string(),
  disable: z.boolean().optional(),
})

export type OptionType = z.infer<typeof optionSchema>
