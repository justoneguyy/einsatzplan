interface CardFormHeaderProps {
  label: string
}

export const CardFormHeader = ({ label }: CardFormHeaderProps) => {
  return (
    <div className='flex w-full select-none flex-col items-center justify-center gap-y-4'>
      <h1 className='text-3xl font-semibold'>Uhlhorn Einsatzplan</h1>
      <p className='text-sm text-muted-foreground'>{label}</p>
    </div>
  )
}
