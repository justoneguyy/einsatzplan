import { aggregateOperationalPlanData } from '@/actions/aggregate-operationalPlan-data'
import { getUsersName } from '@/actions/get-user'
import { OperationalPlanColumns } from '@/components/table/operational-plan/columns'
import { OperationalPlanTable } from '@/components/table/operational-plan/table'
import { searchParamsCache } from '@/lib/params/searchparams'
import UserProvider from '@/lib/provider/user-provider'
import type { SearchParams } from 'nuqs/server'

interface DashboardPageProps {
  searchParams: SearchParams
}

export default async function DashboardPage({
  searchParams,
}: DashboardPageProps) {
  const usersName = await getUsersName()

  const data = await aggregateOperationalPlanData()

  searchParamsCache.parse(searchParams)

  return (
    <section>
      <UserProvider _users={usersName}>
        <OperationalPlanTable columns={OperationalPlanColumns} data={data} />
      </UserProvider>
    </section>
  )
}
