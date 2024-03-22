'use client'

import { useAction } from '@/lib/hooks/useAction'
import { useState } from 'react'
import { Button } from '../ui/button'
import { CustomToast } from '../ui/toaster'
import { FormInput } from './ui/form-input'
import FormSelect from './ui/form-select'
import FormSelectMultiple from './ui/form-select-multiple'
import { FormSubmit } from './ui/form-submit'
import { EmployeesType, EmployeesTypeName } from '@/actions/get-employee/types'
import { createTask } from '@/actions/create-task'
import { Switch } from '../ui/switch'
import { Label } from '../ui/label'
import { DatePickerWithRange } from '../date-picker'

interface TaskFormProps {
  employees: EmployeesTypeName
  onCreate: () => void
  onCancel: () => void
}

// maybe change zod mode to insta check
function TaskForm({ employees, onCreate, onCancel }: TaskFormProps) {
  const [employeeIds, setEmployeeIds] = useState<string[]>([])
  // TODO: add later on
  // const [urlIds, setUrlIds] = useState<string[]>([])

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

  // TODO: consider using entries method: https://developer.mozilla.org/en-US/docs/Web/API/FormData/entries
  // const onSubmit = (formData: FormData) => {
  //   const title = formData.get('title') as string
  //   const description = formData.get('description') as string
  //   const dateFrom = formData.get('dateFrom')
  //   const dateTil = formData.get('dateTil')
  //   const timeFrom = formData.get('timeFrom') as string
  //   const timeTil = formData.get('timeTil') as string
  //   const formEmployeeIds = formData.getAll('employeeId') as string[]
  //   // const formUrlIds = formData.getAll('urlId') as string[]

  //   execute({
  //     title,
  //     description,
  //     dateFrom,
  //     dateTil,
  //     timeFrom,
  //     timeTil,
  //     employeeIds: formEmployeeIds,
  //   })
  // }

  return (
    <form className='space-y-4'>
      {/* <form action={onSubmit} className='space-y-4'> */}
      <div className='flex flex-col gap-3 space-y-2'>
        <FormInput id='title' label='Titel' type='text' errors={fieldErrors} />
        {/* <FormInput
          id='description'
          label='Beschreibung'
          type='text'
          errors={fieldErrors}
        /> */}
        <section className='space-y-3'>
          <div className='flex justify-between'>
            <Label htmlFor='all-day'>Ganztägig</Label>
            <Switch id='all-day' className='h-6 w-11' />
          </div>
          <div className='flex justify-between'>
            <div className='flex flex-col gap-3'>
              {/* <Label>Fr., 22. Maerz 2024</Label> */}
              {/* <Label>Fr., 22. Maerz 2024</Label> */}
              <DatePickerWithRange />
            </div>
            <div className='flex flex-col gap-3'>
              <Label>12:30</Label>
              <Label>13:30</Label>
            </div>
          </div>
        </section>
        <FormSelectMultiple
          deleteButton
          id='employeeId'
          name='employeeId'
          label='Mitarbeiter'
          placeholder='Wähle einen Mitarbeiter aus'
          values={employeeIds}
          onValuesChange={setEmployeeIds}
          options={employees}
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

export default TaskForm
