import db from '@/lib/db'

export const getOnCallServiceByDate = async (dateFrom: Date, dateTo: Date) => {
  try {
    const onCallService = await db.onCallService.findFirst({
      where: {
        dateFrom,
        dateTo,
      },
    })

    return onCallService
  } catch {
    return null
  }
}
