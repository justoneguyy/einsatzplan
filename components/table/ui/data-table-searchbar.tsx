import { Input } from '@/ui/input'

export interface DataTableSearchbarProps {
  title?: string
  filter?: string
  setFilter?: (value: string) => void
}

export function DataTableSearchbar({
  title,
  filter,
  setFilter,
}: DataTableSearchbarProps) {
  const placeholder = title + ' filtern...'
  const placeholderDefault = 'Suchen...'

  return (
    <div>
      <Input
        placeholder={title ? placeholder : placeholderDefault}
        value={filter || ''}
        onChange={(e) => setFilter!(e.target.value)}
        className='h-8 w-[150px] lg:w-[250px]'
      />
    </div>
  )
}
