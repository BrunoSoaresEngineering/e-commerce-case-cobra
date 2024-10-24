/* eslint-disable react/jsx-props-no-spreading */
import { ReactNode } from 'react';
import type { VariantProps } from 'class-variance-authority';
import { Button, buttonVariants } from './ui/button';

type ButtonLoadingProps = {
  children: ReactNode,
  isLoading: boolean,
  loadingText: string,
} & React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>

function ButtonLoading({
  children,
  isLoading,
  loadingText,
  ...props
}: ButtonLoadingProps) {
  return (
    <Button {...props}>
      {isLoading && loadingText ? loadingText : children}
      {isLoading && (
        <span className="ml-1.5 flex items-center gap-1">
          <span
            className="animate-flashing w-1 h-1 bg-white rounded-full inline-block"
          />
          <span
            className="animate-flashing delay-100 w-1 h-1 bg-white rounded-full inline-block"
          />
          <span
            className="animate-flashing delay-200 w-1 h-1 bg-white rounded-full inline-block"
          />
        </span>
      )}
    </Button>
  );
}
export default ButtonLoading;
