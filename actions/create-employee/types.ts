import { Employee } from '@prisma/client'
import { z } from 'zod'

import { ActionState } from '@/lib/helper/create-safe-action'
import { CreateEmployee } from './schema'

export type InputType = z.infer<typeof CreateEmployee>
// change second type to include groups
export type ReturnType = ActionState<InputType, Employee>
