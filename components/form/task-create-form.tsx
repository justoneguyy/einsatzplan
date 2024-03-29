'use client'

import { createTask } from '@/actions/create-task'
import { EmployeesTypeName } from '@/actions/get-employee/types'
import { useAction } from '@/lib/hooks/useAction'
import { addDays, format } from 'date-fns'
import { useState } from 'react'
import { DateRange } from 'react-day-picker'
import { DatePicker } from '../date-picker'
import { DialogClose } from '../dialog/ui/dialog-cancel'
import { Label } from '../ui/label'
import { Switch } from '../ui/switch'
import { CustomToast } from '../ui/toaster'
import { FormInput } from './ui/form-input'
import FormSelectMultiple from './ui/form-select-multiple'
import { FormSubmit } from './ui/form-submit'
import { FormDatePicker } from './ui/form-date-picker'

interface TaskCreateFormProps {
  employees: EmployeesTypeName
  onCreate: () => void
}

// maybe change zod mode to insta check
function TaskCreateForm({ employees, onCreate }: TaskCreateFormProps) {
  const [date, setDate] = useState<DateRange | undefined>()
  // const [date, setDate] = useState<DateRange | undefined>({
  //   from: new Date(),
  //   to: new Date(),
  // })

  const [employeeIds, setEmployeeIds] = useState<string[]>([])
  // TODO: add later on
  // const [urlIds, setUrlIds] = useState<string[]>([])

  // TODO: the toast seems to be messed up because of the dialog. fix this.
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

  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    /* TODO: validate if the employee already has a task on that day with that time */
    const timeFrom = formData.get('timeFrom') as string
    const timeTil = formData.get('timeTil') as string
    const formEmployeeIds = formData.getAll('employeeId') as string[]
    // const formUrlIds = formData.getAll('urlId') as string[]

    if (!date?.from || !date?.to) {
      // CustomToast({
      //   title: 'Datum fehlt',
      //   description: 'Bitte wähle ein Datum aus',
      // })()
      return
    }

    const dateFrom = date.from
    const dateTil = date.to

    execute({
      title,
      description,
      dateFrom,
      dateTil,
      timeFrom,
      timeTil,
      employeeIds: formEmployeeIds,
    })
  }

  return (
    <form action={onSubmit} className='space-y-4'>
      <div className='flex flex-col space-y-2'>
        <FormInput id='title' label='Titel' type='text' errors={fieldErrors} />
        {/* <FormInput
          id='description'
          label='Beschreibung'
          type='text'
          errors={fieldErrors}
        /> */}
        <FormDatePicker
          id='date'
          label='Ausführungsdatum'
          date={date}
          setDate={setDate}
          errors={fieldErrors}
        />
        {/* TODO: add custom time picker with a dropdown menu starting at 06:00 and ending at 20:00 */}
        <div className='flex justify-between gap-3'>
          <FormInput
            id='timeFrom'
            label='Zeit von'
            type='text'
            errors={fieldErrors}
          />
          <FormInput
            id='timeTil'
            label='Zeit bis'
            type='text'
            errors={fieldErrors}
          />
        </div>
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
        <DialogClose />
        <FormSubmit>Anlegen</FormSubmit>
      </div>
    </form>
  )
}

export default TaskCreateForm
