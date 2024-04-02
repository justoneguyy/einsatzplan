import { getGroups } from '@/actions/get-group'
import { UnwrapPromise } from '@/lib/types'

export type GroupsType = UnwrapPromise<ReturnType<typeof getGroups>>
