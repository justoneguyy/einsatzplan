import db from '@/lib/db'

export const getVacationById = async (id: string) => {
  try {
    const vacation = await db.vacation.findUnique({
      where: {
        id,
      },
    })

    return vacation
  } catch {
    return null
  }
}

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
