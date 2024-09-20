/* eslint-disable react/jsx-one-expression-per-line */
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { LoginLink, LogoutLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs/components';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import MaxWidthWrapper from './Max-width-wrapper';

async function Navbar() {
  const currentUser = await getKindeServerSession().getUser();
  const isAdmin = currentUser?.email === process.env.ADMIN_EMAIL;

  return (
    <nav className="sticky z-[100] h-14 inset-x-0 top-0 w-full bg-white/75 backdrop-blur-lg border-b border-gray-200 transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <div className="">
            <Link href="/" className="font-semibold">
              case<span className="text-green-600">cobra</span>
            </Link>
          </div>
          <div className="h-full flex items-center space-x-4">
            {currentUser ? (
              <>
                <Button asChild size="sm" variant="ghost">
                  <LogoutLink>Sign Out</LogoutLink>
                </Button>
                {isAdmin && (
                  <Button asChild size="sm" variant="ghost">
                    <Link href="/">Dashboard</Link>
                  </Button>
                )}
                <Button asChild size="sm" className="hidden sm:flex items-center gap-1">
                  <Link href="/ref">
                    Create Case
                    <ArrowRight className="ml-1.5 h-5 w-5" />
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <Button asChild size="sm" variant="ghost">
                  <RegisterLink>Sign Up</RegisterLink>
                </Button>
                <Button asChild size="sm" variant="ghost">
                  <LoginLink>Login</LoginLink>
                </Button>

                <div className="h-8 w-px bg-zinc-200 hidden sm:block" />

                <Button asChild size="sm" className="hidden sm:flex items-center gap-1">
                  <Link href="/ref">
                    Create Case
                    <ArrowRight className="ml-1.5 h-5 w-5" />
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
}

export default Navbar;
