import { z } from 'zod'
import { Employee } from '@prisma/client'

import { ActionState } from '@/lib/helper/create-safe-action'
import { CreateEmployee } from './schema'

export type InputType = z.infer<typeof CreateEmployee>
export type ReturnType = ActionState<InputType, Employee>
