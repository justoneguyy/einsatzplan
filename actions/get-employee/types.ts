import { z } from 'zod'

import { employeeSchema } from './schema'
import { ActionState } from '../use-safe-action'

export type InputType = z.infer<typeof employeeSchema>
