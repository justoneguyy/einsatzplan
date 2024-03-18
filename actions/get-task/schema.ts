import { z } from 'zod'

const getTasks = z.object({
  title: z.string(),
  description: z.string().nullable(),
  dateFrom: z.date(),
  dateTill: z.date(),
  timeFrom: z.string().nullable(),
  timeTill: z.string().nullable(),
  employees: z.array(
    z.object({
      id: z.string(),
      employeeId: z.string(),
      taskId: z.string(),
      task: z.object({
        id: z.string(),
        username: z.string(),
        firstName: z.string(),
        lastName: z.string(),
        initials: z.string(),
        profilePicture: z.string().nullable(),
      }),
    })
  ),
})

export type GetTasksType = z.infer<typeof getTasks>

const GetTask = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  dateFrom: z.date(),
  dateTill: z.date(),
  timeFrom: z.string().nullable(),
  timeTill: z.string().nullable(),
  employees: z.array(
    z.object({
      task: z.object({
        id: z.string(),
        username: z.string(),
        firstName: z.string(),
        lastName: z.string(),
        initials: z.string(),
        profilePicture: z.string().nullable(),
      }),
    })
  ),
})

export type GetTaskType = z.infer<typeof GetTask>
