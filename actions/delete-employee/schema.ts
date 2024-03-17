import { z } from 'zod'

export const DeleteEmployee = z.object({
  id: z.string(),
})
