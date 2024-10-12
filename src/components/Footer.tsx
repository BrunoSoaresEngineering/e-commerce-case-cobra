/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import MaxWidthWrapper from './Max-width-wrapper';

function Footer() {
  return (
    <footer className="bg-white">
      <MaxWidthWrapper>
        <div
          className="h-20 bg-white flex flex-col md:flex-row justify-center md:justify-between items-center gap-2 border-t border-gray-200"
        >
          <p className="text-sm text-center text-muted-foreground">
            &copy;
            {' '}
            {new Date().getFullYear()}
            {' '}
            All rights reserved
          </p>

          <div className="text-sm text-muted-foreground space-x-8">
            <Link href="#">Terms</Link>
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Cookie Policy</Link>
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
}
export default Footer;
