'use server'

import db from '@/lib/db'
import { cache } from 'react'

export const getSchoolHolidays = cache(async function () {
  const schoolHoliday = await db.schoolHoliday.findMany({})

  return schoolHoliday
})
