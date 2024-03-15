import { z } from 'zod'

const GetEmployee = z.object({
  id: z.string(),
  username: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  initials: z.string(),
  profilePicture: z.string().nullable(),
  roleId: z.string(),
  role: z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().nullable(),
  }),
  groups: z.array(
    z.object({
      id: z.string(),
      employeeId: z.string(),
      groupId: z.string(),
      group: z.object({
        id: z.string(),
        name: z.string(),
        description: z.string().nullable(),
      }),
    })
  ),
})

export type GetEmployeeType = z.infer<typeof GetEmployee>
