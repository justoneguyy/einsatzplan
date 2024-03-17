import { z } from 'zod'
import { Employee } from '@prisma/client'

import { ActionState } from '@/lib/create-safe-action'

import { DeleteEmployee } from './schema'

export type InputType = z.infer<typeof DeleteEmployee>
export type ReturnType = ActionState<InputType, Employee>
