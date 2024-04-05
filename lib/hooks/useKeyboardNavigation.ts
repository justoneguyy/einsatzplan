import { useEffect } from 'react'

export function useWeekNavigation(
  onLeftArrow: () => void,
  onRightArrow: () => void,
  isEnabled: boolean
) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isEnabled) {
        switch (event.key) {
          case 'ArrowLeft':
            onLeftArrow()
            break
          case 'ArrowRight':
            onRightArrow()
            break
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onLeftArrow, onRightArrow, isEnabled])
}

export function useMonthNavigation(
  onUpArrow: () => void,
  onDownArrow: () => void,
  isEnabled: boolean
) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isEnabled) {
        switch (event.key) {
          case 'ArrowUp':
            onUpArrow()
            break
          case 'ArrowDown':
            onDownArrow()
            break
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onUpArrow, onDownArrow, isEnabled])
}

export function useOpenCalendarShortcut(onShortcut: () => void) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 'k') {
        onShortcut()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onShortcut])
}
