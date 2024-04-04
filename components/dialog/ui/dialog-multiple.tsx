import {
  Children,
  cloneElement,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import { Slot, SlotProps } from '@radix-ui/react-slot'
import { DialogProps } from '@radix-ui/react-dialog'

type Maybe<T> = T | null | undefined

const MultipleDialogContainerContext = createContext<unknown>(null)
MultipleDialogContainerContext.displayName = 'MultipleDialogContainerContext'

export function useMultipleDialog<T = unknown>(): [
  Maybe<T>,
  React.Dispatch<React.SetStateAction<Maybe<T>>>,
]
export function useMultipleDialog<T = unknown>(
  v: T
): [boolean, (v: boolean) => void]
export function useMultipleDialog<T = unknown>(v?: T) {
  const s = useContext(MultipleDialogContainerContext) as [
    Maybe<T>,
    React.Dispatch<React.SetStateAction<Maybe<T>>>,
  ]
  if (!s)
    throw new Error(
      "Cannot use 'useMultipleDialog' outside 'MultipleDialogProvider'."
    )
  if (v == null) return s

  const [dialog, setDialog] = s

  const onOpenChange = useCallback(
    (o: boolean) => (o ? setDialog(v) : setDialog(null)),
    [v]
  )

  const open = dialog === v
  const result = useMemo(() => [open, onOpenChange] as const, [open])

  return result
}

export function MultipleDialogTrigger<T = unknown>({
  value,
  onClick,
  ...props
}: SlotProps &
  React.RefAttributes<HTMLElement> & {
    value: T
  }) {
  const [, open] = useMultipleDialog(value)
  const oc = useCallback<React.MouseEventHandler<HTMLElement>>(
    (e) => {
      open(true)
      onClick && onClick(e)
    },
    [value, onClick]
  )
  return <Slot onClick={oc} {...props} />
}

export function MultipleDialogContainer<T = unknown>({
  value,
  children,
  ...props
}: Omit<DialogProps, 'open' | 'onOpenChange'> & {
  value: T
  children?: JSX.Element
}) {
  const [open, onOpenChange] = useMultipleDialog(value)

  return useMemo(() => {
    Children.only(children)
    return children
      ? cloneElement(children, {
          ...props,
          open,
          onOpenChange,
        })
      : null
  }, [children, open])
}

type Builder<T = unknown> = {
  readonly Trigger: (
    ...args: Parameters<typeof MultipleDialogTrigger<T>>
  ) => React.ReactNode
  readonly Container: (
    ...args: Parameters<typeof MultipleDialogContainer<T>>
  ) => React.ReactNode
}

const builder = {
  Trigger: MultipleDialogTrigger,
  Container: MultipleDialogContainer,
} as const

export type MultipleDialogBuilder<T = unknown> = (
  builder: Builder<T>
) => React.ReactNode
export function MultipleDialog<T = unknown>({
  defaultOpen = null,
  children,
}: {
  defaultOpen?: T | null
  children?: React.ReactNode | MultipleDialogBuilder<T>
}) {
  const [state, setState] = useState<T | null>(defaultOpen)

  const c = useMemo(
    () => (typeof children === 'function' ? children(builder) : children),
    [children]
  )

  return (
    <MultipleDialogContainerContext.Provider value={[state, setState]}>
      {c}
    </MultipleDialogContainerContext.Provider>
  )
}
