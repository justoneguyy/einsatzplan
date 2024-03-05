import { employeeSchema } from '@/_dev/mockdata/schema'
import { TableWeek } from '@/components/table-week'
import { promises as fs } from 'fs'
import path from 'path'
import { z } from 'zod'

async function getData() {
  const data = await fs.readFile(
    path.join(process.cwd(), '_dev/mockdata/employees.json')
  )

  const employees = JSON.parse(data.toString())

  return z.array(employeeSchema).parse(employees)
}

// im proba gonna get the data in the table-week component and not here
export default async function DashboardPage() {
  const employees = await getData()

  return (
    <section className=''>
      <TableWeek />
    </section>
  )
}
