import { endOfWeek, setDefaultOptions, startOfWeek } from 'date-fns'
import { de } from 'date-fns/locale'
import {
  parseAsIsoDateTime,
  createSearchParamsCache,
  createSerializer,
} from 'nuqs/server'

setDefaultOptions({
  locale: de,
  weekStartsOn: 1,
})

const getWeekRange = () => {
  const now = new Date()
  const start = startOfWeek(now)
  const end = endOfWeek(now)

  return {
    from: start,
    to: end,
  }
}

export const searchParams = {
  // TODO: change the format of the date that is showed in the url. preffered: YYYY-MM-dd or dd.MM.yyyy
  dateFrom: parseAsIsoDateTime.withDefault(getWeekRange().from),
  dateTo: parseAsIsoDateTime.withDefault(getWeekRange().to),
}

export const searchParamsCache = createSearchParamsCache(searchParams)
export const serialize = createSerializer(searchParams)
