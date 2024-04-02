import { getRoles } from '@/actions/get-role'
import { UnwrapArray, UnwrapPromise } from '@/lib/types'

export type RolesType = UnwrapPromise<ReturnType<typeof getRoles>>
