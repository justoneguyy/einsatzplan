import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'

export function CarouselTest() {
  const SLIDE_COUNT = 5
  const slides = Array.from(Array(SLIDE_COUNT).keys())

  return (
    <Carousel className=''>
      <CarouselContent className=''>
        {slides.map((index) => (
          <CarouselItem
            key={index}
            className='shrink-0 grow-0 basis-10/12 rounded-md pl-4'
          >
            <Card>
              <CardContent className='flex items-center justify-center p-6'>
                <span>{index + 1}</span>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
