'use client';

import { createCheckoutSession } from '@/app/actions/check-out';
import ButtonLoading from '@/components/Button-loading';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useLoginModalContext } from '@/components/login-modal/Login-modal-context';

type CheckoutButtonProps = {
  configuration: {
    id: string,
    imageUrl: string,
  },
  totalPrice: number,
}

function CheckoutButton({ configuration, totalPrice }: CheckoutButtonProps) {
  const router = useRouter();
  const { toast } = useToast();
  const { setIsLoginModalOpen } = useLoginModalContext();

  const { isAuthenticated } = useKindeBrowserClient();

  const { mutate: createPaymentSession, isPending } = useMutation({
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

  const handleCheckout = () => {
    if (isAuthenticated) {
      createPaymentSession({ configuration, totalPrice });
      return;
    }
    localStorage.setItem('configurationId', configuration.id);
    setIsLoginModalOpen(true);
  };

  return (
    <ButtonLoading
      disabled={isPending}
      isLoading={isPending}
      loadingText="Preparing Payment"
      className="px-4 sm:px-6 lg:px-8"
      onClick={handleCheckout}
    >
      Check out
      <ArrowRight className="inline ml-1.5 h-4 w-4" />
    </ButtonLoading>
  );
}
export default CheckoutButton;
