import NewTaskDialog from '@/components/newTask-dialog'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/ui/tooltip'
import { PersonIcon } from '@radix-ui/react-icons'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { GridTest } from './components/gridTest'

export default function Test() {
  return (
    <div className='flex flex-col gap-10'>
      <GridTest />
    </div>
  )
}
