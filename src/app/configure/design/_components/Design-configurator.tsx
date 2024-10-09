'use client';

import { useRef } from 'react';
import { Radio, RadioGroup } from '@headlessui/react';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Check, ChevronsUpDown } from 'lucide-react';
import { formatCurrency } from '@/lib/formatters';
import { BASE_PRICE } from '@/config/products';
import { availableOptions } from '@/validators/configuration-validator';
import OptionsSelector from './Options-selector';
import SaveButton from './Save-button';
import CaseConfiguratorCanvas from './Case-configurator-canvas';
import { useCurrentOptionsContext } from './Configurator-context';

type DesignConfiguratorProps = {
  configId: string,
  imageUrl: string,
};

function DesignConfigurator({ configId, imageUrl }: DesignConfiguratorProps) {
  const phoneCaseRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const optionsContext = useCurrentOptionsContext();

  const calculateGrandTotal = () => {
    const { finish, material } = optionsContext.currentOptions;
    return formatCurrency((BASE_PRICE + finish.price + material.price) / 100);
  };

  return (
    <div className="mt-20 mb-20 pb-20 grid grid-cols-1 lg:grid-cols-3">

      <CaseConfiguratorCanvas
        phoneCaseRef={phoneCaseRef}
        containerRef={containerRef}
        imageUrl={imageUrl}
      />

      <div className="h-[37.5rem] w-full col-span-full lg:col-span-1 flex flex-col bg-white">
        <ScrollArea className="px-8 pb-12 pt-8 flex-1 overflow-auto">
          <h2 className="font-bold text-3xl tracking-tight">Customize your case</h2>
          <div className="w-full h-px bg-zinc-200 my-6" />

          <div className="mt-4 flex flex-col justify-between gap-6">
            <RadioGroup
              value={optionsContext.currentOptions.color}
              onChange={(value) => optionsContext.setCurrentOptions((previousOptions) => ({
                ...previousOptions,
                color: value,
              }))}
            >
              <Label>
                Color:
                {' '}
                {optionsContext.currentOptions.color.label}
              </Label>
              <div className="mt-3 ml-1 flex items-center space-x-3">
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
                    {optionsContext.currentOptions.model.label}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {availableOptions.MODELS.map((model) => {
                    const isSelected = model.label === optionsContext.currentOptions.model.label;

                    return (
                      <DropdownMenuItem
                        key={model.label}
                        onClick={
                          () => optionsContext.setCurrentOptions(
                            (previousOption) => ({ ...previousOption, model }),
                          )
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
              currentOption={optionsContext.currentOptions.material}
              onChange={
                (material) => optionsContext.setCurrentOptions(
                  (previousOption) => ({ ...previousOption, material }),
                )
              }
            />

            <OptionsSelector
              characteristic={{ name: 'finish', options: availableOptions.FINISHES }}
              currentOption={optionsContext.currentOptions.finish}
              onChange={
                (finish) => optionsContext.setCurrentOptions(
                  (previousOption) => ({ ...previousOption, finish }),
                )
              }
            />
          </div>
        </ScrollArea>

        <div className="w-full px-8 h-16 bg-white">
          <div className="h-px w-full bg-zinc-200" />

          <div className="flex items-center w-full h-full gap-6">
            <p className="font-medium whitespace-nowrap">
              {calculateGrandTotal()}
            </p>
            <SaveButton
              phoneCaseRef={phoneCaseRef}
              containerRef={containerRef}
              configurationImage={{
                configId,
                src: imageUrl,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default DesignConfigurator;
