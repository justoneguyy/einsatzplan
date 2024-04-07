import { endOfWeek, format, setDefaultOptions, startOfWeek } from 'date-fns'
import { de } from 'date-fns/locale'
import {
  createParser,
  createSearchParamsCache,
  createSerializer,
} from 'nuqs/server'

setDefaultOptions({
  locale: de,
  weekStartsOn: 1,
})

const formatDate = (date: Date) => format(date, 'yyyy-MM-dd')

const getWeekRange = () => {
  const now = new Date()
  const start = startOfWeek(now)
  const end = endOfWeek(now)

  return {
    from: start,
    to: end,
  }
}

// // custom parser. otherwise the date would be shown as datetime(utc) in the url
const parseAsYYYYMMDD = createParser({
  parse(queryValue) {
    const parsedDate = new Date(queryValue)
    return isNaN(parsedDate.getTime()) ? null : parsedDate
  },
  serialize(value) {
    return formatDate(value)
  },
})

export const searchParams = {
  dateFrom: parseAsYYYYMMDD.withDefault(getWeekRange().from),
  dateTo: parseAsYYYYMMDD.withDefault(getWeekRange().to),
}

export const searchParamsCache = createSearchParamsCache(searchParams)
export const serialize = createSerializer(searchParams)
