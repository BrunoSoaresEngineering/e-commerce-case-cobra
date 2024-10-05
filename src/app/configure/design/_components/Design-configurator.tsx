'use client';

import NextImage from 'next/image';
import { Rnd } from 'react-rnd';

import { cn } from '@/lib/utils';
import phoneTemplateImage from '../../../../../public/phone-template.png';
import ResizeHandle from './Resize-handle';

type Props = {
  configId: string,
  imageUrl: string,
  imageDimensions: { width: number; height: number }
};

function DesignConfigurator({ configId, imageUrl, imageDimensions }: Props) {
  return (
    <div className="mt-20 grid grid-cols-1">
      <div className="relative h-[37.5rem] w-full p-12 overflow-hidden border-2 border-dashed border-gray-300 flex items-center justify-center rounded-lg">
        <div className="relative w-60 pointer-events-none">
          <NextImage
            src={phoneTemplateImage}
            alt="phone base image"
            className="relative pointer-events-none select-none z-50"
          />

          {/* background of config area */}
          <div className="absolute z-40 inset-0 rounded-[32px] left-[3px] top-px right-[3px] bottom-px shadow-[0_0_0_9999px_rgba(229,231,235,0.6)]" />

          {/* case color layer */}
          <div
            className={cn(
              'absolute inset-0 rounded-[32px] left-[3px] top-px right-[3px] bottom-px',
              'bg-blue-950',
            )}
          />
        </div>

        <Rnd
          default={{
            x: 150,
            y: 205,
            width: imageDimensions.width / 5,
            height: imageDimensions.height / 5,
          }}
          lockAspectRatio
          resizeHandleComponent={{
            topRight: <ResizeHandle />,
            topLeft: <ResizeHandle />,
            bottomLeft: <ResizeHandle />,
            bottomRight: <ResizeHandle />,
          }}
        >
          <div className="relative w-full h-full">
            <NextImage
              src={imageUrl}
              alt="your image"
              fill
            />
          </div>
        </Rnd>
      </div>
    </div>
  );
}
export default DesignConfigurator;
