import type { ReactNode } from 'react';
import Providers from '@/components/Providers';

type LayoutProps = {
  children: ReactNode
}

function Layout({ children }: LayoutProps) {
  return (
    <Providers>
      {children}
    </Providers>
  );
}

export default Layout;
