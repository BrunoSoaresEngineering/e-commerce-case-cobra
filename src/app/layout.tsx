import type { Metadata } from 'next';
import { Recursive } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import LoginModalContext from '@/components/login-modal/Login-modal-context';
import LoginModal from '@/components/login-modal/Login-modal';

const recursive = Recursive({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'CaseCobra',
  description: 'Create custom high-quality phone cases in seconds',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${recursive.className} antialiased`}>
        <main className="grainy-light min-h-screen flex flex-col justify-between">
          <Navbar />

          <div className="flex-1">
            <LoginModalContext>
              <LoginModal />
              {children}
            </LoginModalContext>
          </div>

          <Footer />
        </main>

        <Toaster />
      </body>
    </html>
  );
}
