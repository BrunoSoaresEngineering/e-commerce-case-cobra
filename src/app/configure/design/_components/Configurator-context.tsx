'use client';

import {
  createContext,
  Dispatch,
  ReactElement,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react';
import { availableOptions } from '@/validators/configuration-validator';

type ConfiguratorContextProps = {
  children: ReactElement,
  imageDimensions: { width: number; height: number },
  imageUrl: string,
};

type Position = { left: number, top: number };
type Dimensions = { height: number, width: number };

type ConfigurationImageContext = {
  position: Position,
  setPosition: Dispatch<SetStateAction<Position>>,
  dimensions: Dimensions,
  setDimensions: Dispatch<SetStateAction<Dimensions>>,
  src: string,
};

type ConfiguratorOptions = {
  color: (typeof availableOptions.COLORS)[number],
  model: (typeof availableOptions.MODELS)[number],
  material: (typeof availableOptions.MATERIALS)[number],
  finish: (typeof availableOptions.FINISHES)[number],
};
type ConfiguratorOptionsContext = {
  currentOptions: ConfiguratorOptions,
  setCurrentOptions: Dispatch<SetStateAction<ConfiguratorOptions>>
};

const defaultConfigurationImageContext = {
  position: { left: 150, top: 205 },
  setPosition: () => {},
  dimensions: { height: 0, width: 0 },
  setDimensions: () => {},
  src: '',
};
const ConfigurationImageContext = createContext<ConfigurationImageContext>(
  defaultConfigurationImageContext,
);
function useConfigurationImageContext() {
  return useContext(ConfigurationImageContext);
}

const defaultCurrentOptions = {
  color: availableOptions.COLORS[0],
  model: availableOptions.MODELS[availableOptions.MODELS.length - 1],
  material: availableOptions.MATERIALS[0],
  finish: availableOptions.FINISHES[0],
};
const defaultCurrentOptionsFallback = {
  currentOptions: defaultCurrentOptions,
  setCurrentOptions: () => {},
};
const CurrentOptionsContext = createContext<ConfiguratorOptionsContext>(
  defaultCurrentOptionsFallback,
);
function useCurrentOptionsContext() {
  return useContext(CurrentOptionsContext);
}

function ConfiguratorContext({ children, imageDimensions, imageUrl }: ConfiguratorContextProps) {
  const [position, setPosition] = useState<Position>(defaultConfigurationImageContext.position);

  const [dimensions, setDimensions] = useState<Dimensions>({
    width: imageDimensions.width / 5,
    height: imageDimensions.height / 5,
  });

  const [currentOptions, setCurrentOptions] = useState<ConfiguratorOptions>(defaultCurrentOptions);

  const configurationImageCtxValue = useMemo(() => ({
    position,
    setPosition,
    dimensions,
    setDimensions,
    src: imageUrl,
  }), [position, dimensions, imageUrl]);

  const currentOptionsCtxValue = useMemo(() => ({
    currentOptions,
    setCurrentOptions,
  }), [currentOptions]);

  return (
    <ConfigurationImageContext.Provider value={configurationImageCtxValue}>
      <CurrentOptionsContext.Provider value={currentOptionsCtxValue}>
        {children}
      </CurrentOptionsContext.Provider>
    </ConfigurationImageContext.Provider>
  );
}
export default ConfiguratorContext;

export {
  useConfigurationImageContext,
  useCurrentOptionsContext,
  type ConfiguratorOptions,
  type ConfigurationImageContext,
};
