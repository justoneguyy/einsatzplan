'use client'

import { useAction } from '@/lib/hooks/useAction'
import { useState } from 'react'
import { DateRange } from 'react-day-picker'
import { DialogClose } from '../dialog/ui/dialog-cancel'
import { CustomToast } from '../ui/toast'
import { FormDatePicker } from './ui_alt/form-date-picker'
import { FormInput } from './ui_alt/form-input'
import FormSelectMultiple from './ui_alt/form-select-multiple'
import { FormSubmit } from './ui_alt/form-submit'
import { updateTask } from '@/actions/update-task'
import { GetTaskType } from '@/actions/get-task/schema'
import { useUserContext } from '@/lib/provider/user-provider'

interface TaskEditFormProps {
  task: GetTaskType
  onCreate: () => void
}

// maybe change zod mode to insta check
function TaskEditForm({ task, onCreate }: TaskEditFormProps) {
  const title = task.title
  const description = task.description
  const [userIds, setUserIds] = useState(task.users.map((user) => user.task.id))
  const timeFrom = task.timeFrom
  const timeTo = task.timeTo

  const [date, setDate] = useState<DateRange | undefined>({
    from: task.dateFrom,
    to: task.dateTo,
  })

  const { _users } = useUserContext()

  // TODO: add later on
  // const [urlIds, setUrlIds] = useState<string[]>([])

  // TODO: the toast seems to be messed up because of the dialog. fix this.
  const { execute, fieldErrors } = useAction(updateTask, {
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
    const timeTo = formData.get('timeTo') as string
    const formUserIds = formData.getAll('userId') as string[]
    // const formUrlIds = formData.getAll('urlId') as string[]

    if (!date?.from || !date?.to) {
      return
    }

    const dateFrom = date.from
    const dateTo = date.to

    execute({
      id: task.id,
      title,
      description,
      dateFrom,
      dateTo,
      timeFrom,
      timeTo,
      userIds: formUserIds,
    })
  }

  return (
    <form action={onSubmit} className='space-y-4'>
      <div className='flex flex-col space-y-2'>
        <FormInput
          id='title'
          defaultValue={title}
          label='Titel'
          type='text'
          errors={fieldErrors}
        />
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
        {timeFrom && timeTo && (
          <div className='flex justify-between gap-3'>
            <FormInput
              id='timeFrom'
              defaultValue={timeFrom}
              label='Zeit von'
              type='text'
              errors={fieldErrors}
            />
            <FormInput
              id='timeTo'
              defaultValue={timeTo}
              label='Zeit bis'
              type='text'
              errors={fieldErrors}
            />
          </div>
        )}
        <FormSelectMultiple
          deleteButton
          id='userId'
          name='userId'
          label='Mitarbeiter'
          placeholder='Wähle einen Mitarbeiter aus'
          options={_users}
          values={userIds}
          onValuesChange={setUserIds}
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

export default TaskEditForm
