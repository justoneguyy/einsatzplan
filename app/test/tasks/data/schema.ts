import { z } from 'zod'

// use (multiple) prisma schema later
// export const taskSchema = z.object({
//   id: z.string(),
//   title: z.string(),
//   weekday: z.string(),
//   dateFrom: z.date(),
//   dateTil: z.date(),
//   timeFrom: z.string(),
//   timeTil: z.string(),
//   assignedEmployeeName: z.string(),
//   assignedEmployeeProfilePicture: z.string().optional(),
//   assignedEmployeeAvailability: z.string(),
// })

// export const employeeSchema = z.object({
//   id: z.string(),
//   name: z.string(),
//   profilePicture: z.string().optional(),
//   availability: z.string().optional(),
//   role: z.string().optional(),
// })

// export type Employee = z.infer<typeof employeeSchema>

export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  weekday: z.string(),
  assignedEmployeeName: z.string(),

  dateFrom: z.date().optional(),
  dateTil: z.date().optional(),
  timeFrom: z.string().optional(),
  timeTil: z.string().optional(),
  assignedEmployeeProfilePicture: z.string().optional(),
  assignedEmployeeAvailability: z.string().optional(),
})
export type Task = z.infer<typeof taskSchema>
