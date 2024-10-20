'use client';

import { getPaymentStatus } from '@/app/actions/payment-status';
import WaitingComponent from '@/components/Waiting-component';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import PaymentConfirmed from './Payment-confirmed';

function ThankYou() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || '';

  const { data } = useQuery({
    queryKey: ['get-payment-status'],
    queryFn: () => getPaymentStatus({ orderId }),
    retry: true,
    retryDelay: 500,
  });

  if (!data) {
    return <WaitingComponent title="Loading your order..." text="Please wait." />;
  }

  if (data.isPaid === true) {
    return <PaymentConfirmed order={data} />;
  }

  return <WaitingComponent text="Verifying your payment..." title="This might take a while." />;
}
export default ThankYou;
