'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/ui/form'
import { RadioGroup, RadioGroupItem } from '@/ui/radio-group'
import { useTheme } from 'next-themes'
import { toast } from 'sonner'
import { CustomToast } from '@/components/ui/toaster'

const appearanceFormSchema = z.object({
  theme: z.enum(['light', 'dark'], {
    required_error: 'Bitte wähle ein Theme aus.',
  }),
  font: z.enum(['inter', 'manrope', 'system'], {
    invalid_type_error: 'Wähle ein Font aus.',
    required_error: 'Bitte wähle ein Font aus.',
  }),
})

type AppearanceFormValues = z.infer<typeof appearanceFormSchema>

// TODO: save previously selected theme either to local storage (on by default) or to database
const defaultValues: Partial<AppearanceFormValues> = {
  theme: 'light',
}

export function AppearanceForm() {
  const { setTheme } = useTheme()

  const form = useForm<AppearanceFormValues>({
    resolver: zodResolver(appearanceFormSchema),
    defaultValues,
  })

  function onSubmit(data: AppearanceFormValues) {
    CustomToast({
      title: '',
      description: '',
    })()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='font'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Font</FormLabel>
              <div className='relative w-max'>
                <FormControl>
                  <select
                    className={cn(
                      buttonVariants({ variant: 'outline' }),
                      'w-[200px] appearance-none font-normal'
                    )}
                    {...field}
                  >
                    {/* TODO: add multiple fonts later on? */}
                    <option value='inter'>Geist</option>
                    <option value='manrope'>Inter</option>
                    <option value='system'>System</option>
                  </select>
                </FormControl>
                <ChevronDownIcon className='absolute right-3 top-2.5 h-4 w-4 opacity-50' />
              </div>
              <FormDescription>
                Wähle das Font welches du benutzen möchtest.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='theme'
          render={({ field }) => (
            <FormItem className='space-y-1'>
              <FormLabel>Theme</FormLabel>
              <FormDescription>Wähle ein Theme für die Seite.</FormDescription>
              <FormMessage />
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className='grid max-w-md grid-cols-2 gap-8 pt-2'
              >
                <FormItem>
                  <FormLabel className='[&:has([data-state=checked])>div]:border-primary'>
                    <FormControl>
                      <RadioGroupItem
                        onChange={() => setTheme('light')}
                        value='light'
                        className='sr-only'
                      />
                    </FormControl>
                    <div className='items-center rounded-md border-2 border-muted p-1 hover:border-accent'>
                      <div className='space-y-2 rounded-sm bg-[#ecedef] p-2'>
                        <div className='space-y-2 rounded-md bg-white p-2 shadow-sm'>
                          <div className='h-2 w-[80px] rounded-lg bg-[#ecedef]' />
                          <div className='h-2 w-[100px] rounded-lg bg-[#ecedef]' />
                        </div>
                        <div className='flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm'>
                          <div className='h-4 w-4 rounded-full bg-[#ecedef]' />
                          <div className='h-2 w-[100px] rounded-lg bg-[#ecedef]' />
                        </div>
                        <div className='flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm'>
                          <div className='h-4 w-4 rounded-full bg-[#ecedef]' />
                          <div className='h-2 w-[100px] rounded-lg bg-[#ecedef]' />
                        </div>
                      </div>
                    </div>
                    <span className='block w-full p-2 text-center font-normal'>
                      Hell
                    </span>
                  </FormLabel>
                </FormItem>
                <FormItem>
                  <FormLabel className='[&:has([data-state=checked])>div]:border-primary'>
                    <FormControl>
                      <RadioGroupItem
                        onChange={() => setTheme('dark')}
                        value='dark'
                        className='sr-only'
                      />
                    </FormControl>
                    <div className='items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground'>
                      <div className='bg-slate-950 space-y-2 rounded-sm p-2'>
                        <div className='bg-slate-800 space-y-2 rounded-md p-2 shadow-sm'>
                          <div className='bg-slate-400 h-2 w-[80px] rounded-lg' />
                          <div className='bg-slate-400 h-2 w-[100px] rounded-lg' />
                        </div>
                        <div className='bg-slate-800 flex items-center space-x-2 rounded-md p-2 shadow-sm'>
                          <div className='bg-slate-400 h-4 w-4 rounded-full' />
                          <div className='bg-slate-400 h-2 w-[100px] rounded-lg' />
                        </div>
                        <div className='bg-slate-800 flex items-center space-x-2 rounded-md p-2 shadow-sm'>
                          <div className='bg-slate-400 h-4 w-4 rounded-full' />
                          <div className='bg-slate-400 h-2 w-[100px] rounded-lg' />
                        </div>
                      </div>
                    </div>
                    <span className='block w-full p-2 text-center font-normal'>
                      Dunkel
                    </span>
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormItem>
          )}
        />

        <Button type='submit'>Einstellungen übernehmen</Button>
      </form>
    </Form>
  )
}
