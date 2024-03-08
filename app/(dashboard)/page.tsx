import { TableWeek } from '@/components/table-week'
import { promises as fs } from 'fs'
import path from 'path'
import { z } from 'zod'

// im proba gonna get the data in the table-week component and not here
export default function DashboardPage() {
  return (
    <section className=''>
      <TableWeek />
    </section>
  )
}
