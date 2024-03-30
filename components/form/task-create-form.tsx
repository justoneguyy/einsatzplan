'use client'

import { createTask } from '@/actions/create-task'
import { UsersTypeName } from '@/actions/get-user/types'
import { useAction } from '@/lib/hooks/useAction'
import { useState } from 'react'
import { DateRange } from 'react-day-picker'
import { DialogClose } from '../dialog/ui/dialog-cancel'
import { CustomToast } from '../ui/toaster'
import { FormDatePicker } from './ui/form-date-picker'
import { FormInput } from './ui/form-input'
import FormSelectMultiple from './ui/form-select-multiple'
import { FormSubmit } from './ui/form-submit'
import { FormSwitch } from './ui/form-switch'

interface TaskCreateFormProps {
  users: UsersTypeName
  onCreate: () => void
}

// maybe change zod mode to insta check
function TaskCreateForm({ users, onCreate }: TaskCreateFormProps) {
  const [date, setDate] = useState<DateRange | undefined>()
  const [isAllDay, setIsAllDay] = useState(false)
  const [userIds, setUserIds] = useState<string[]>([])
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
    /* TODO: validate if the user already has a task on that day with that time */
    const timeFrom = formData.get('timeFrom') as string
    const timeTil = formData.get('timeTil') as string
    const formEployeeIds = formData.getAll('userId') as string[]
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
      userIds: formEployeeIds,
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
        <div className='flex justify-between gap-8'>
          <FormSwitch
            className=''
            id='isAllDay'
            label='Ganztägig'
            checked={isAllDay}
            onCheckedChange={setIsAllDay}
            errors={fieldErrors}
          />
          {/* TODO: add custom time picker with a dropdown menu starting at 06:00 and ending at 20:00 */}
          <div className='flex gap-4'>
            <FormInput
              id='timeFrom'
              label='Zeit von'
              type='text'
              placeholder='08:00'
              disabled={isAllDay}
              errors={fieldErrors}
              // separator
              // separatorSide='left'
            />
            <FormInput
              id='timeTil'
              label='Zeit bis'
              type='text'
              placeholder='10:00'
              disabled={isAllDay}
              errors={fieldErrors}
            />
          </div>
        </div>
        <FormSelectMultiple
          deleteButton
          id='userId'
          name='userId'
          label='Mitarbeiter'
          placeholder='Wähle einen Mitarbeiter aus'
          values={userIds}
          onValuesChange={setUserIds}
          options={users}
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
