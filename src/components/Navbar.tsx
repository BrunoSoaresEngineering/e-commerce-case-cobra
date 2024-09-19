/* eslint-disable react/jsx-one-expression-per-line */
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import MaxWidthWrapper from './Max-width-wrapper';

function Navbar() {
  const currentUser = false;
  const isAdmin = true;

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
                  <Link href="/">Sign Out</Link>
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
                  <Link href="/">Sign Up</Link>
                </Button>
                <Button asChild size="sm" variant="ghost">
                  <Link href="/">Login</Link>
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
