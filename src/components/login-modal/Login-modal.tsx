'use client';

import Image from 'next/image';
import { LoginLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { useLoginModalContext } from './Login-modal-context';
import { Button } from '../ui/button';

import loginImage from '../../../public/snake-1.png';

function LoginModal() {
  const { isLoginModalOpen, setIsLoginModalOpen } = useLoginModalContext();
  return (
    <>
      <p>{isLoginModalOpen}</p>
      <Dialog open={isLoginModalOpen} onOpenChange={setIsLoginModalOpen}>
        <DialogContent className="z-[999999999999] bg-white">
          <DialogHeader>
            <div className="mx-auto w-24 mb-2">
              <Image src={loginImage} alt="snake image" className="object-contain" />
            </div>
            <DialogTitle className="text-3xl text-center text-gray-900 font-bold tracking-tight">
              Log in to continue
            </DialogTitle>
            <DialogDescription>
              <span className="font-medium text-zinc-900">Your configuration is saved!</span>
              {' '}
              Please login or create an account to complete your purchase.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-6">
            <Button asChild size="lg" variant="outline">
              <RegisterLink>Sign Up</RegisterLink>
            </Button>
            <Button asChild size="lg" variant="default">
              <LoginLink>Login</LoginLink>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
export default LoginModal;
