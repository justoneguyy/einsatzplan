import db from '@/lib/db'

export const getSicknessEntryById = async (id: string) => {
  try {
    const sicknessEntry = await db.sicknessEntry.findUnique({
      where: {
        id,
      },
    })

    return sicknessEntry
  } catch {
    return null
  }
}

export const getSicknessEntryByEmployeeDate = async (
  userId: string,
  dateFrom: Date,
  dateTo: Date
) => {
  try {
    const sicknessEntry = await db.sicknessEntry.findFirst({
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
