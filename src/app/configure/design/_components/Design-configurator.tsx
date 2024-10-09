'use client';

import { useRef } from 'react';
import CaseConfiguratorCanvas from './Case-configurator-canvas';
import CaseConfiguratorOptions from './Case-configurator-options';

type DesignConfiguratorProps = {
  configId: string,
  imageUrl: string,
};

function DesignConfigurator({ configId, imageUrl }: DesignConfiguratorProps) {
  const phoneCaseRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="mt-20 mb-20 pb-20 grid grid-cols-1 lg:grid-cols-3">

      <CaseConfiguratorCanvas
        phoneCaseRef={phoneCaseRef}
        containerRef={containerRef}
        imageUrl={imageUrl}
      />

      <CaseConfiguratorOptions
        phoneCaseRef={phoneCaseRef}
        containerRef={containerRef}
        configurationImage={{
          configId,
          src: imageUrl,
        }}
      />
    </div>
  );
}
export default DesignConfigurator;
