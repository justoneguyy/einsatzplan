'use server'

import db from '@/lib/db'
import { cache } from 'react'

export const getSicknessEntries = cache(async function () {
  const sicknessEntries = await db.sicknessEntry.findMany({})

  return sicknessEntries
})
