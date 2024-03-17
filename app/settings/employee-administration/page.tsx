import { getEmployees } from '@/actions/get-employee'
import { getGroups } from '@/actions/get-group'
import { getRoles } from '@/actions/get-role'
import { EmployeeDialog } from '@/components/dialog/employee-dialog'
import EmployeeForm from '@/components/form/employee-form'
import { EmployeeOptions } from '@/components/table/data/employee-options'
import { EmployeeColumns } from '@/components/table/employee-columns'
import { EmployeeDataTable } from '@/components/table/employee-data-table'
import { Separator } from '@/ui/separator'

// it seems that the groups and roles are not correctly implemented (cant be searched and sorted)
export default async function SettingsEmployeeAdministrationPage() {
  const employees = await getEmployees()

  const { roleOptions, groupOptions } = await EmployeeOptions()

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
      {/* <CreateEmployeeForm /> */}
      <EmployeeDataTable
        columns={EmployeeColumns}
        data={employees}
        roleOptions={roleOptions}
        groupOptions={groupOptions}
        roles={roles}
        groups={groups}
      />
    </div>
  )
}
