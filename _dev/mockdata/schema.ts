import { z } from 'zod'

export const employeeSchema = z.object({
  id: z.string(),
  name: z.string(),
  profilePicture: z.string(),
  role: z.string(),
  availability: z.array(
    z.object({
      status: z.string(),
      color: z.string(),
    })
  ),
  assignments: z.array(
    z.object({
      day: z.string(),
      tasks: z.array(
        z.object({
          timeFrom: z.string(),
          timeTil: z.string(),
          task: z.string(),
        })
      ),
    })
  ),
})
