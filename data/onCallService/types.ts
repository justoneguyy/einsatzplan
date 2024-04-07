import { getOnCallServices } from '@/actions/get-onCallService'
import { UnwrapArray, UnwrapPromise } from '@/lib/types'

export type OnCallServiceType = UnwrapArray<
  UnwrapPromise<ReturnType<typeof getOnCallServices>>
>
