import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ComboBoxResponsive } from './combobox-responsive'

export function AssignmentUserCard() {
  return (
    <Card className=''>
      <CardHeader>
        <CardTitle>Teilnehmende Mitarbeiter</CardTitle>
        <CardDescription>Füge weitere Mitarbeiter hinzu</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='flex flex-col space-y-1.5'>
          <Label htmlFor='framework'>Mitarbeiter</Label>
          <ComboBoxResponsive />
        </div>
      </CardContent>
      <CardFooter className='flex justify-between'>
        <Button variant='outline'>Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  )
}
