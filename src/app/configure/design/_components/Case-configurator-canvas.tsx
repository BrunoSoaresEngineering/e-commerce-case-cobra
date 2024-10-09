import { RefObject } from 'react';
import Image from 'next/image';
import { Rnd } from 'react-rnd';
import { cn } from '@/lib/utils';
import { useConfigurationImageContext, useCurrentOptionsContext } from './Configurator-context';

import phoneTemplateImage from '../../../../../public/phone-template.png';

function ResizeHandle() {
  return (
    <div
      className="h-5 w-5 rounded-full bg-white shadow border border-zinc-200 hover:bg-primary transition"
    />
  );
}

type Props = {
  phoneCaseRef: RefObject<HTMLImageElement>
  containerRef: RefObject<HTMLDivElement>
  imageUrl: string
}
function CaseConfiguratorCanvas({ phoneCaseRef, containerRef, imageUrl }: Props) {
  const configurationImage = useConfigurationImageContext();
  const optionsContext = useCurrentOptionsContext();

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative h-[37.5rem] w-full p-12 overflow-hidden flex items-center justify-center',
        'max-w-4xl col-span-2',
        'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary',
        'border-2 border-dashed border-gray-300  rounded-lg',
      )}
    >
      <div className="relative w-60 pointer-events-none">
        <Image
          ref={phoneCaseRef}
          src={phoneTemplateImage}
          alt="phone base image"
          className="relative pointer-events-none select-none z-50"
        />

        {/* background of config area */}
        <div className={cn(
          'absolute z-40 inset-0 rounded-[32px] left-[3px] top-px right-[3px] bottom-px',
          'shadow-[0_0_0_9999px_rgba(229,231,235,0.6)]',
        )}
        />

        {/* case color layer */}
        <div
          className={cn(
            'absolute inset-0 rounded-[32px] left-[3px] top-px right-[3px] bottom-px',
            `bg-${optionsContext.currentOptions.color.tw}`,
          )}
        />
      </div>

      <Rnd
        default={{
          x: configurationImage.position.left,
          y: configurationImage.position.top,
          ...configurationImage.dimensions,
        }}
        lockAspectRatio
        resizeHandleComponent={{
          topRight: <ResizeHandle />,
          topLeft: <ResizeHandle />,
          bottomLeft: <ResizeHandle />,
          bottomRight: <ResizeHandle />,
        }}
        onResizeStop={(_, __, ref, ___, { x, y }) => {
          configurationImage.setDimensions({
            height: parseInt(ref.style.height, 10),
            width: parseInt(ref.style.width, 10),
          });
          configurationImage.setPosition({ left: x, top: y });
        }}
        onDragStop={(_, data) => configurationImage.setPosition({ left: data.x, top: data.y })}
        className="border-[3px] border-primary"
      >
        <div className="relative w-full h-full">
          <Image
            src={imageUrl}
            alt="your image"
            fill
          />
        </div>
      </Rnd>
    </div>
  );
}
export default CaseConfiguratorCanvas;
