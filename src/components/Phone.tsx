import { cn } from '@/lib/utils';
import Image, { StaticImageData } from 'next/image';

type Props = {
  imgSrc: string | StaticImageData,
  className?: string,
  dark?: boolean
}

function Phone({ imgSrc, className, dark = false }: Props) {
  return (
    <div className={cn('relative z-30 overflow-hidden pointer-events-none select-none', className)}>
      <Image
        src={
          dark
            ? '/phone-template-dark-edges.png'
            : '/phone-template-white-edges.png'
        }
        alt="phone image"
        width={896}
        height={1831}
      />
      <div className="absolute inset-0 -z-10">
        <div className="relative object-cover min-w-full min-h-full">
          <Image
            src={imgSrc}
            alt="overlaying phone image"
            fill
          />
        </div>
      </div>
    </div>
  );
}

export default Phone;
