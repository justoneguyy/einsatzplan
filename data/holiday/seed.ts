'use server'

import db from '@/lib/db'

// TODO: add cronjob for this (this is just the initial seed. The cronjob will be run every year to seed the holidays 3 years from now, starting on 2025-01-01 -> where its gonna seed 2028-01-01 - 2028-12-31.)
// TODO: call this function in the Dockerfile on initial setup (the db.holiday.create wont work in that case. probably have to use a bash script instead)
export async function seedHolidays() {
  try {
    const apiEndpoints = [
      // 2022-01-01 to 2024-12-31
      'https://openholidaysapi.org/PublicHolidays?countryIsoCode=DE&languageIsoCode=DE&validFrom=2022-01-01&validTo=2024-12-31&subdivisionCode=DE-NI',
      // 2025-01-01 to 2027-12-31
      'https://openholidaysapi.org/PublicHolidays?countryIsoCode=DE&languageIsoCode=DE&validFrom=2025-01-01&validTo=2027-12-31&subdivisionCode=DE-NI',
    ]

    for (const endpoint of apiEndpoints) {
      const response = await fetch(endpoint)
      const holidays = await response.json()

      // TODO: add logging
      console.log('API Call erfolgreich.\n')

      for (const holiday of holidays) {
        const name = holiday.name[0].text
        const date = new Date(holiday.startDate)

        console.log(date + ' - ' + name)

        // TODO: add validation

        await db.holiday.create({
          data: {
            name,
            date,
          },
        })
      }
    }

    // TODO: anderes wort
    console.log('Feiertage erfolgreich eingefuegt.')
  } catch (error) {
    console.error('Error beim einfuegen der Feiertage:', error)
  }
}
