import { User } from '@prisma/client'
import { z } from 'zod'

import { ActionState } from '@/lib/helper/create-safe-action'
import { CreateUser } from './schema'

export type InputType = z.infer<typeof CreateUser>
// change second type to include groups
export type ReturnType = ActionState<InputType, User>
