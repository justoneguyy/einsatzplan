import { getEmployees } from '@/actions/get-employee'
import { getRoles } from '@/actions/get-role'
import { EmployeeOptions } from '@/components/table/data/employee-options'
import { EmployeeColumns } from '@/components/table/employee-columns'
import { EmployeeDataTable } from '@/components/table/employee-data-table'
import { Separator } from '@/ui/separator'

export default async function SettingsEmployeeAdministrationPage() {
  const employees = await getEmployees()

  const { roleOptions, groupOptions } = await EmployeeOptions()

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
      />
    </div>
  )
}
