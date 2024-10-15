'use client';

import { createCheckoutSession } from '@/app/actions/check-out';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

type Props = {
  configuration: {
    id: string,
    imageUrl: string,
  },
  totalPrice: number,
}
function CheckoutButton({ configuration, totalPrice }: Props) {
  const router = useRouter();
  const { toast } = useToast();

  const { mutate: createPaymentSession } = useMutation({
    mutationKey: ['checkout'],
    mutationFn: createCheckoutSession,
    onSuccess: ({ url }) => {
      if (!url) {
        throw new Error('Unable to retrieve payment URL');
      }
      router.push(url);
    },
    onError: () => toast({
      title: 'Something went wrong.',
      description: 'There was an error on our end. Please try again.',
      variant: 'destructive',
    }),
  });

  return (
    <Button
      className="px-4 sm:px-6 lg:px-8"
      onClick={() => createPaymentSession({ configuration, totalPrice })}
    >
      Check out
      <ArrowRight className="inline ml-1.5 h-4 w-4" />
    </Button>
  );
}
export default CheckoutButton;
