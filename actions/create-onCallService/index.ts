'use server'

import { getOnCallServiceByDate } from '@/data/onCallService'
import db from '@/lib/db'
import { OnCallServiceSchema } from '@/schemas'
import { z } from 'zod'

export const createOnCallService = async (
  values: z.infer<typeof OnCallServiceSchema>
) => {
  const validatedFields = OnCallServiceSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  const { date, userId } = validatedFields.data

  const existingOnCallService = await getOnCallServiceByDate(date.from, date.to)

  if (existingOnCallService) {
    return { error: 'In diesem Zeitraum gibt es bereits eine Rufbereitschaft!' }
  }

  await db.onCallService.create({
    data: {
      dateFrom: date.from,
      dateTo: date.to,
      userId,
    },
  })

  return { success: 'Rufbereitschaft erfolgreich erstellt!' }
}
