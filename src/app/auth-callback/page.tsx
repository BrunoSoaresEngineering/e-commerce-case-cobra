'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import logInUser from '../actions/log-in';

function AuthCallbackPage() {
  const router = useRouter();
  const configIdRef = useRef<string | null>(null);

  useEffect(() => {
    configIdRef.current = localStorage.getItem('configurationId');
  }, []);

  const { data } = useQuery({
    queryKey: ['auth-callback'],
    queryFn: () => logInUser(),
    retry: true,
    retryDelay: 500,
  });

  if (data?.success) {
    if (configIdRef.current) {
      localStorage.removeItem('configurationId');
      router.push(`/configure/preview?id=${configIdRef.current}`);
    } else {
      router.push('/');
    }
  }

  return (
    <div className="mt-24 flex flex-col items-center gap-2">
      <Loader2 className="w-8 h-8 animate-spin text-zinc-500" />
      <h3 className="font-semibold text-xl">Logging you in...</h3>
      <p>You will be redirected automatically.</p>
    </div>
  );
}
export default AuthCallbackPage;
