import db from '@/lib/db'

export const getVacationEntryByEmployeeDate = async (
  userId: string,
  dateFrom: Date,
  dateTo: Date
) => {
  try {
    const vacationEntry = await db.vacation.findFirst({
      where: {
        userId,
        dateFrom,
        dateTo,
      },
    })

    return vacationEntry
  } catch {
    return null
  }
}
