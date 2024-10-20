import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import type { CaseColor } from '@prisma/client';
import { COLORS } from '@/validators/configuration-validator';
import { cn } from '@/lib/utils';
import { AspectRatio } from './ui/aspect-ratio';

import phoneInHandImage from '../../public/clearphone.png';

const ASPECT_RATIO = 1.499250375;
const PHONE_WIDTH_FACTOR = 0.212333334;
const PHONE_HEIGHT_FACTOR = 0.150771704;

type PhoneInHandProps = {
  croppedImageUrl: string,
  color: CaseColor,
}
function PhoneInHand({ croppedImageUrl, color }: PhoneInHandProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [renderedDimensions, setRenderedDimensions] = useState({
    width: 0,
    height: 0,
  });

  const handleResize = () => {
    if (!ref.current) {
      return;
    }
    const { width, height } = ref.current.getBoundingClientRect();
    setRenderedDimensions({ width, height });
  };

  useEffect(() => {
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const caseColorCSS = `bg-${COLORS.find((caseColor) => caseColor.value === color)?.tw}`;

  return (
    <AspectRatio ref={ref} ratio={ASPECT_RATIO} className="relative">
      <Image
        src={phoneInHandImage}
        alt="phone in hand"
        className="antialiased pointer-events-none z-40 rounded-md"
      />

      <Image
        src={croppedImageUrl}
        width={896}
        height={1831}
        alt="configuration preview in phone"
        className={cn(
          'z-20 absolute phone-skew',
          'rounded-t-[15px] rounded-b-[10px] md:rounded-t-[30px] md:rounded-b-[20px]',
          caseColorCSS,
        )}
        style={{
          left: renderedDimensions.width * (0.5 - PHONE_WIDTH_FACTOR * 0.5),
          top: renderedDimensions.height * PHONE_HEIGHT_FACTOR,
          width: renderedDimensions.width * PHONE_WIDTH_FACTOR * 1.0335,
        }}
      />
    </AspectRatio>
  );
}
export default PhoneInHand;
