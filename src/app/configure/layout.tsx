import MaxWidthWrapper from '@/components/Max-width-wrapper';
import { ReactNode } from 'react';
import ConfigurationSteps from './_components/Configuration-steps';

type LayoutProps = {
  children: ReactNode
}

function Layout({ children }: LayoutProps) {
  return (
    <MaxWidthWrapper>
      <ConfigurationSteps />
      {children}
    </MaxWidthWrapper>
  );
}

export default Layout;
