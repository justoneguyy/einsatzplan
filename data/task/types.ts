import { getTasks } from '@/actions/get-task'
import { UnwrapArray, UnwrapPromise } from '@/lib/types'

export type TaskType = UnwrapArray<UnwrapPromise<ReturnType<typeof getTasks>>>
