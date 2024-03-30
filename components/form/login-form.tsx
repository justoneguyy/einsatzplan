'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/ui/button'
import { Input } from '@/ui/input'
import { Loader2, MailIcon } from 'lucide-react'
import { useState, useTransition } from 'react'
import { FormInput } from './ui/form-input'
import { FormSubmit } from './ui/form-submit'
import { Separator } from '../ui/separator'
import { EyeNoneIcon, EyeOpenIcon } from '@radix-ui/react-icons'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { AuthCardWrapper } from '../card/auth-card-wrapper'
import { FormError } from './ui/form-error'
import { FormSuccess } from './ui/form-success'
import { useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'
import { LoginSchema } from '@/schemas'

interface LoginFormProps {}

export function LoginForm() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl')
  const urlError =
    searchParams.get('error') === 'OAuthAccountNotLinked'
      ? 'Email already in use with different provider!'
      : ''

  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    // TODO: change email to username
    defaultValues: {
      email: '',
      password: '',
    },
  })

  // const onSubmit = (values: z.infer<typeof LoginSchema>) => {
  //   setError("");
  //   setSuccess("");

  //   startTransition(() => {
  //     login(values, callbackUrl)
  //       .then((data) => {
  //         if (data?.error) {
  //           form.reset();
  //           setError(data.error);
  //         }

  //         if (data?.success) {
  //           form.reset();
  //           setSuccess(data.success);
  //         }

  //       })
  //       .catch(() => setError("Something went wrong"));
  //   });
  // };

  return (
    <AuthCardWrapper
      headerLabel='Login'
      backButtonLabel='Registrieren'
      backButtonHref='/auth/register'
    >
      {/* TODO: add loading icon besides the login buttonon transition */}
      <Form {...form}>
        <form
          // onSubmit={form.handleSubmit(onSubmit)}
          onSubmit={form.handleSubmit(() => {})}
          className='space-y-6'
        >
          <div className='space-y-4'>
            <>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder='justin.hoffmann@uhlhorn.de'
                        type='email'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Passwort</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder='********'
                        type='password'
                      />
                    </FormControl>
                    <FormMessage />
                    <Button
                      size='sm'
                      variant='link'
                      asChild
                      className='px-0 font-normal'
                    >
                      <Link href='/auth/reset'>Passwort vergessen?</Link>
                    </Button>
                  </FormItem>
                )}
              />
            </>
          </div>
          <FormError message={error || urlError} />
          <FormSuccess message={success} />
          <Button disabled={isPending} type='submit' className='w-full'>
            Anmelden
          </Button>
        </form>
      </Form>
    </AuthCardWrapper>
  )
}
// 'use client'

// import { cn } from '@/lib/utils'
// import { Button } from '@/ui/button'
// import { Input } from '@/ui/input'
// import { Loader2, MailIcon } from 'lucide-react'
// import { useState } from 'react'
// import { FormInput } from './ui/form-input'
// import { FormSubmit } from './ui/form-submit'
// import { Separator } from '../ui/separator'
// import { EyeNoneIcon, EyeOpenIcon } from '@radix-ui/react-icons'

// interface LoginFormProps {}

// export function LoginForm() {
//   const [isLoading, setIsLoading] = useState<boolean>(false)
//   const [showPassword, setShowPassword] = useState<boolean>(false)

//   const [username, setUsername] = useState<string>('')
//   const [email, setEmail] = useState<string>('')

//   const onSubmit = (formData: FormData) => {
//     const username = formData.get('username') as string
//     const email = formData.get('email') as string
//     const password = formData.get('password') as string
//   }

//   return (
//     <form action={onSubmit} className='space-y-6'>
//       <div className='flex flex-col space-y-3'>
//         {/* TODO: somehow both username and e-mail has to be validated in this input field */}
//         <FormInput
//           id='username'
//           label='Benutzername oder E-Mail'
//           // placeholder='Benutzername oder E-Mail'
//           autocomplete='email'
//           type='text'
//           onChange={(e) => setUsername(e.target.value)}
//           // errors={fieldErrors}
//         />
//         <div className='relative'>
//           <FormInput
//             id='password'
//             className='tracking-wider'
//             label='Passwort'
//             // placeholder='Passwort'
//             autocomplete='current-password'
//             type={showPassword ? 'text' : 'password'}
//             onChange={(e) => setUsername(e.target.value)}
//             // errors={fieldErrors}
//           />
//           <div className='absolute inset-y-0 right-0 flex items-center pr-3'>
//             {showPassword ? (
//               // TODO: add tooltip?
//               <EyeNoneIcon
//                 className='h-4 w-4'
//                 onClick={() => setShowPassword(false)}
//               />
//             ) : (
//               <EyeOpenIcon
//                 className='h-4 w-4'
//                 onClick={() => setShowPassword(true)}
//               />
//             )}
//           </div>
//         </div>
//         {/* Passwort vergessen */}
//         {/* TODO: add second 'step' to this form, if clicked on "passwort vergessen && the email wasnt entered" */}
//         <FormSubmit className='text-sm' size='sm' disabled={isLoading}>
//           {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
//           Login
//         </FormSubmit>
//       </div>
//       <div className='relative'>
//         <div className='absolute inset-0 flex items-center'>
//           <span className='w-full border-t' />
//         </div>
//         <div className='relative flex justify-center text-xs uppercase'>
//           <span className='bg-background px-2 text-muted-foreground'>oder</span>
//         </div>
//       </div>
//       {/* <div>
//         <Separator />
//       </div> */}
//       <div>
//         <Button
//           className='w-full'
//           // onClick={}
//           variant='outline'
//           type='button'
//           disabled={isLoading}
//         >
//           {isLoading ? (
//             <Loader2 className='mr-2 h-4 w-4 animate-spin' />
//           ) : (
//             <MailIcon className='mr-2 h-4 w-4' />
//           )}
//           Registrieren
//         </Button>
//       </div>
//     </form>
//   )
// }
