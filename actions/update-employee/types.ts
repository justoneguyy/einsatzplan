import { z } from 'zod'
import { Employee } from '@prisma/client'

import { ActionState } from '@/lib/create-safe-action'
import { UpdateEmployee } from './schema'

export type InputType = z.infer<typeof UpdateEmployee>
export type ReturnType = ActionState<InputType, Employee>
