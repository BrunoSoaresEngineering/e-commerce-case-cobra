'use client';

import { useRef } from 'react';
import CaseConfiguratorCanvas from './Case-configurator-canvas';
import CaseConfiguratorOptions from './Case-configurator-options';

type DesignConfiguratorProps = {
  configId: string,
};

function DesignConfigurator({ configId }: DesignConfiguratorProps) {
  const phoneCaseRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="mt-20 mb-20 pb-20 grid grid-cols-1 lg:grid-cols-3">

      <CaseConfiguratorCanvas
        phoneCaseRef={phoneCaseRef}
        containerRef={containerRef}
      />

      <CaseConfiguratorOptions
        phoneCaseRef={phoneCaseRef}
        containerRef={containerRef}
        configId={configId}
      />
    </div>
  );
}
export default DesignConfigurator;
