import { getEmployees } from '@/actions/get-employee'
import { getGroups } from '@/actions/get-group'
import { getRoles } from '@/actions/get-role'
import { Options } from '@/components/table/data/options'
import { EmployeeColumns } from '@/components/table/employee-columns'
import { EmployeeDataTable } from '@/components/table/employee-data-table'
import GroupProvider from '@/lib/provider/group-provider'
import RoleProvider from '@/lib/provider/role-provider'
import { Separator } from '@/ui/separator'

export default async function SettingsEmployeeAdministrationPage() {
  const employees = await getEmployees()

  const { roleOptions, groupOptions } = await Options()

  const roles = await getRoles()
  const groups = await getGroups()

  return (
    <div className='space-y-6'>
      <div>
        <h2 className='text-2xl font-medium'>Mitarbeiter</h2>
        <p className='text-base text-muted-foreground'>
          Hier können Mitarbeiter hinzugefügt, bearbeitet und gelöscht werden.
        </p>
      </div>
      <Separator />
      <RoleProvider _roles={roles}>
        <GroupProvider _groups={groups}>
          <EmployeeDataTable
            columns={EmployeeColumns}
            data={employees}
            roleOptions={roleOptions}
            groupOptions={groupOptions}
            roles={roles}
            groups={groups}
          />
        </GroupProvider>
      </RoleProvider>
    </div>
  )
}
