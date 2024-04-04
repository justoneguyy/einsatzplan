'use server'

import db from '@/lib/db'
import { cache } from 'react'

export const getHolidays = cache(async function () {
  const holidays = await db.holiday.findMany({})

  return holidays
})
