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

export default function Test() {
  return (
    <div className='flex flex-col gap-10'>
      <NewTaskDialog />
      <div>
        <TooltipProvider delayDuration={0}>
          <Tooltip open={true}>
            <TooltipTrigger asChild>
              <div className=''>hallo</div>
            </TooltipTrigger>
            <TooltipContent usePortal={true} className='bg-transparent p-0'>
              <Card>
                <CardHeader className='p-4'>
                  <CardTitle className='text-center text-base'>
                    Mitarbeiter
                  </CardTitle>
                </CardHeader>
                <CardContent className='flex justify-start px-4'>
                  <Badge className=''>Johne Doe</Badge>
                </CardContent>
              </Card>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  )
}
