import { cn, getRandomInt } from '@/lib/utils';
import { Star } from 'lucide-react';

type StarsProps = {
  quantity: number,
  containerClassName?: string,
  starClassName?: string
}

function Stars({ quantity, containerClassName, starClassName }: StarsProps) {
  return (
    <div className={cn('flex gap-0.5', containerClassName)}>
      {[...Array(quantity)].map(() => (
        <Star
          key={`stars-${getRandomInt(Number.POSITIVE_INFINITY)}`}
          className={cn('h-4 w-4 text-green-600 fill-green-600', starClassName)}
        />
      ))}
    </div>
  );
}
export default Stars;
