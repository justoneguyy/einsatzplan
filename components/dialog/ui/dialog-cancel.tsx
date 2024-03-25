'use client'

import { Button } from '@/components/ui/button'
import { DialogClosePrimitive } from '@/components/ui/dialog'

export function DialogClose() {
  return (
    <DialogClosePrimitive asChild>
      <Button aria-label='Close'>Abbrechen</Button>
    </DialogClosePrimitive>
  )
}
