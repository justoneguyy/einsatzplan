'use server'

import db from '@/lib/db'
import { cache } from 'react'

export const getOnCallServices = cache(async function () {
  const onCallService = await db.onCallService.findMany({})

  return onCallService
})
