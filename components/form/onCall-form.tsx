'use client'

import { createTask } from '@/actions/create-task'
import { EmployeesTypeName } from '@/actions/get-employee/types'
import { useAction } from '@/lib/hooks/useAction'
import { useState } from 'react'
import { Button } from '../ui/button'
import { CustomToast } from '../ui/toaster'
import { FormInput } from './ui/form-input'
import FormSelectMultiple from './ui/form-select-multiple'
import { FormSubmit } from './ui/form-submit'
import FormSelect from './ui/form-select'

interface OnCallFormProps {
  employees: EmployeesTypeName
  onCreate: () => void
  onCancel: () => void
}

function OnCallForm({ employees, onCreate, onCancel }: OnCallFormProps) {
  const [employeeId, setEmployeeId] = useState('')

  const { execute, fieldErrors } = useAction(createTask, {
    onSuccess: (task) => {
      CustomToast({
        title: `Aufgabe ${task.title} erstellt`,
      })()
      onCreate()
    },
    onError: (error) => {
      CustomToast({
        title: `Die Aufgabe konnte nicht erstellt werden`,
        description: error,
        duration: 15000,
      })()
    },
  })

  // const onSubmit = (formData: FormData) => {
  //   const employeeId = formData.get('employeeId') as string

  //   execute({
  //     employeeId,
  //   })
  // }

  return (
    <form className='space-y-4'>
      {/* <form action={onSubmit} className='space-y-4'> */}
      {/* TOOD: add date range */}
      <div className='flex flex-col space-y-2'>
        <FormSelect
          id='employeeId'
          label='Mitarbeiter'
          placeholder='Wähle einen Mitarbeiter aus'
          options={employees}
          value={employeeId}
          onValueChange={setEmployeeId}
          errors={fieldErrors}
        />
      </div>
      <div className='!mt-8 flex justify-end space-x-3'>
        <Button type='button' onClick={onCancel}>
          Abbrechen
        </Button>
        <FormSubmit>Anlegen</FormSubmit>
      </div>
    </form>
  )
}

export default OnCallForm
