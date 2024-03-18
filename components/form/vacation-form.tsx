'use client'

import { employees } from '@/_dev/mockdata/constants'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { timeHHmmRegex } from '@/lib/helper/regex'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const vacationFormSchema = z.object({
  employee: z.string({ required_error: 'Bitte gib einen Mitarbeiter ein.' }),
  dateFrom: z.date({ required_error: 'Das Startdatum ist erforderlich' }),
  dateTo: z.date({ required_error: 'Das Enddatum ist erforderlich' }),
  // TODO: is this needed or just "Ganztags" / "Halbtags"?
  timeFrom: z
    .string()
    .regex(timeHHmmRegex, {
      message: 'Bitte gib eine valide Uhrzeit ein.',
    })
    .optional(),
  timeTo: z
    .string()
    .regex(timeHHmmRegex, {
      message: 'Bitte gib eine valide Uhrzeit ein.',
    })
    .optional(),
})

type VacationFormValues = z.infer<typeof vacationFormSchema>

const defaultValues: Partial<VacationFormValues> = {
  dateFrom: new Date(),
  dateTo: new Date(),
}

export function VacationForm({
  onCancel,
  onCreate,
}: {
  onCancel?: () => void
  onCreate?: () => void
}) {
  const form = useForm<VacationFormValues>({
    resolver: zodResolver(vacationFormSchema),
    defaultValues,
    mode: 'onChange',
  })

  function onSubmit(data: VacationFormValues) {
    toast('Urlaubseintrag erstellt', {
      description: 'Der Urlaubseintrag wurde erfolgreich erstellt.',
      duration: 5000,
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-4 p-4 md:p-0'
      >
        <FormField
          control={form.control}
          name='employee'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mitarbeiter</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Mitarbeiter auswaehlen' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {employees.map((employee) => (
                      <SelectItem key={employee.id} value={employee.name}>
                        {employee.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='!mt-8 flex justify-end space-x-3'>
          <Button type='button' variant='outline' onClick={onCancel}>
            Abbrechen
          </Button>
          {/* close on Click? */}
          <Button type='submit' onClick={onCreate}>
            Erstellen
          </Button>
        </div>
      </form>
    </Form>
  )
}
