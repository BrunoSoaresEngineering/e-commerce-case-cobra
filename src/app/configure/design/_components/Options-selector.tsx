import {
  Radio,
  RadioGroup,
  Label as RadioLabel,
  Description,
} from '@headlessui/react';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/lib/formatters';

type Option = {
  readonly value: string,
  readonly label: string,
  readonly description?: string,
  readonly price: number,
};

type Props = {
  characteristic: {
    name: string,
    options: readonly Option[],
  }
  currentOption: Option,
  onChange: (changedCharacteristic: any) => void
};

function OptionsSelector({ characteristic, currentOption, onChange }: Props) {
  return (
    <RadioGroup
      value={currentOption}
      onChange={onChange}
    >
      <Label className="capitalize">{characteristic.name}</Label>

      <div className="mt-3 space-y-4">
        {characteristic.options.map((option) => (
          <Radio
            key={option.value}
            value={option}
            className={({ checked }) => cn(
              'px-6 py-4 flex flex-col sm:flex-row justify-between',
              'rounded-lg bg-white border-2 border-zinc-200',
              'shadow-sm outline-none focus:outline-none, ring-0, focus:ring-0',
              { 'border-primary': checked },
            )}
          >
            <div className="flex flex-col text-sm">
              <RadioLabel as="span" className="font-medium text-gray-900">
                {option.label}
              </RadioLabel>
              {option.description && (
                <Description as="span" className="text-gray-500">
                  {option.description}
                </Description>
              )}
            </div>

            <Description as="span" className="mt-2 sm:mt-0 sm:ml-4 text-sm font-medium text-gray-900">
              {formatCurrency(option.price / 100)}
            </Description>
          </Radio>
        ))}
      </div>
    </RadioGroup>
  );
}
export default OptionsSelector;
