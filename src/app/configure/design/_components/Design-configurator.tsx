'use client';

import { useState } from 'react';
import NextImage from 'next/image';
import { Rnd } from 'react-rnd';
import { Radio, RadioGroup } from '@headlessui/react';
import { Label } from '@/components/ui/label';

import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { availableOptions } from '@/validators/configuration-validator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Check, ChevronsUpDown } from 'lucide-react';
import ResizeHandle from './Resize-handle';
import phoneTemplateImage from '../../../../../public/phone-template.png';
import OptionsSelector from './Options-selector';

type DesignConfiguratorProps = {
  configId: string,
  imageUrl: string,
  imageDimensions: { width: number; height: number }
};

export type ConfiguratorOption = {
  color: (typeof availableOptions.COLORS)[number],
  model: (typeof availableOptions.MODELS)[number],
  material: (typeof availableOptions.MATERIALS)[number],
  finish: (typeof availableOptions.FINISHES)[number],
}

function DesignConfigurator({ configId, imageUrl, imageDimensions }: DesignConfiguratorProps) {
  const [options, setOptions] = useState<ConfiguratorOption>({
    color: availableOptions.COLORS[0],
    model: availableOptions.MODELS[availableOptions.MODELS.length - 1],
    material: availableOptions.MATERIALS[0],
    finish: availableOptions.FINISHES[0],
  });

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
              `bg-${options.color.tw}`,
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

      <div className="h-[37.5rem] w-full col-span-full lg:col-span-1 flex flex-col bg-white">
        <ScrollArea className="px-8 pb-12 pt-8 flex-1 overflow-auto">
          <h2 className="font-bold text-3xl tracking-tight">Customize your case</h2>
          <div className="w-full h-px bg-zinc-200 my-6" />

          <div className="mt-4 flex flex-col justify-between gap-6">
            <RadioGroup
              value={options.color}
              onChange={(value) => setOptions((previousOptions) => ({
                ...previousOptions,
                color: value,
              }))}
            >
              <Label>
                Color:
                {' '}
                {options.color.label}
              </Label>
              <div className="mt-3 flex items-center space-x-3">
                {availableOptions.COLORS.map((color) => (
                  <Radio
                    key={color.label}
                    value={color}
                    className={({ checked }) => cn(
                      'flex -m-0.5 p-0.5 border-2 border-transparent rounded-full cursor-pointer',
                      'active:outline-none focus:outline-none active:ring-0 focus:ring-0',
                      'cursor-pointer items-center justify-center',
                      {
                        [`border-${color.tw}`]: checked,
                      },
                    )}
                  >
                    <span
                      className={cn(
                        `h-8 w-8 rounded-full bg-${color.tw}`,
                        'border border-black border-opacity-10',
                      )}
                    />
                  </Radio>
                ))}
              </div>
            </RadioGroup>

            <div className="relative flex flex-col gap-3 w-full">
              <Label>Model</Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className="w-full justify-between"
                  >
                    {options.model.label}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {availableOptions.MODELS.map((model) => {
                    const isSelected = model.label === options.model.label;

                    return (
                      <DropdownMenuItem
                        key={model.label}
                        onClick={
                          () => setOptions((previousOption) => ({ ...previousOption, model }))
                        }
                        className={cn(
                          'flex gap-1 items-center p-1.5 text-sm',
                          'cursor-default hover:bg-zinc-100',
                          { 'bg-zinc-100': isSelected },
                        )}
                      >
                        <Check
                          className={cn('mr-2 h-4', isSelected ? 'opacity-100' : 'opacity-0')}
                        />
                        {model.label}
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <OptionsSelector
              characteristic={{ name: 'material', options: availableOptions.MATERIALS }}
              currentOption={options.material}
              onChange={
                (material) => setOptions((previousOption) => ({ ...previousOption, material }))
              }
            />

            <OptionsSelector
              characteristic={{ name: 'finish', options: availableOptions.FINISHES }}
              currentOption={options.finish}
              onChange={
                (finish) => setOptions((previousOption) => ({ ...previousOption, finish }))
              }
            />
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
export default DesignConfigurator;
