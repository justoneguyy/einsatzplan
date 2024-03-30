interface AuthCardHeaderProps {
  label: string
}

export const AuthCardHeader = ({ label }: AuthCardHeaderProps) => {
  return (
    <div className='flex w-full flex-col items-center justify-center gap-y-4'>
      <h1 className='text-3xl font-semibold'>Uhlhorn Einsatzplan</h1>
      <p className='text-sm text-muted-foreground'>{label}</p>
    </div>
  )
}
