import { cn, getRandomInt } from '@/lib/utils';
import { Star } from 'lucide-react';

type StarsProps = {
  quantity: number,
  size: number,
  containerClassName?: string,
  starClassName?: string,
}

function Stars({
  quantity,
  size,
  containerClassName,
  starClassName,
}: StarsProps) {
  return (
    <div className={cn('flex gap-0.5', containerClassName)}>
      {[...Array(quantity)].map(() => (
        <Star
          key={`stars-${getRandomInt(Number.POSITIVE_INFINITY)}`}
          className={cn(`h-${size} w-${size} text-green-600 fill-green-600`, starClassName)}
        />
      ))}
    </div>
  );
}
export default Stars;
