import NewTaskDialog from '@/components/newTask-dialog'
import { CarouselTest } from './components/carouselTest'

export default function Test() {
  return (
    <div className='flex w-full flex-col items-center justify-center gap-20 py-10'>
      <NewTaskDialog />
      <CarouselTest />
    </div>
  )
}
