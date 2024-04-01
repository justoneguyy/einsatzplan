import db from '@/lib/db'

export const getSicknessEntryByEmployeeDate = async (
  userId: string,
  dateFrom: Date,
  dateTo: Date
) => {
  try {
    const sicknessEntry = await db.sickness.findFirst({
      where: {
        userId,
        dateFrom,
        dateTo,
      },
    })

    return sicknessEntry
  } catch {
    return null
  }
}
