import { Suspense } from 'react';
import Providers from '@/components/Providers';
import ThankYou from './_components/Thank-you';

function ThankYouPage() {
  return (
    <Providers>
      <Suspense>
        <ThankYou />
      </Suspense>
    </Providers>
  );
}
export default ThankYouPage;
