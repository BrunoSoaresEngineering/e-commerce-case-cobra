import MaxWidthWrapper from '@/components/Max-width-wrapper';
import Phone from '@/components/Phone';
import { Check } from 'lucide-react';
import Image from 'next/image';
import { formatNumber } from '@/lib/formatters';
import Stars from './components/Stars';

const mainFeatures = [
  'High-quality, durable material',
  '5 year print guarantee',
  'Modern iPhone models supported',
];

const userPhotosHero = [
  '/users/user-1.png',
  '/users/user-2.png',
  '/users/user-3.png',
  '/users/user-4.jpg',
  '/users/user-5.jpg',
];

const numCustomers = 2513;

export default function Home() {
  return (
    <main className="bg-slate-50">
      <section>
        <MaxWidthWrapper className="pb-24 pt-10 lg:pt-24 xl:pt-32 lg:grid lg:grid-cols-3 lg:gap-x-0 xl:gap-x-8">
          <div className="relative mx-auto px-6 lg:px-0 lg:pt-4 text-center lg:text-left flex flex-col items-center lg:items-start col-span-2">
            <div className="absolute hidden lg:block w-28 left-0 -top-20">
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t via-slate-50/50 from-slate-50" />
              <Image src="/snake-1.png" alt="CaseCobra logo" width="633" height="824" />
            </div>

            <h1 className="w-fit tracking-tight text-balance mt-16 font-bold leading-tight text-gray-900 text-5xl md:text-6xl lg:text-7xl">
              Your image on a
              {' '}
              <span className="bg-green-600 text-white">Custom</span>
              {' '}
              Phone Case
            </h1>

            <p className="mt-8 text-lg">
              Capture your favorite memories with your own,
              {' '}
              <span className="text-semibold">one-of-one</span>
              {' '}
              phone case. CaseCobra allows you to protect your memories, not just your phone case.
            </p>

            <ul className="mt-8 space-y-2">
              {mainFeatures.map((feature, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <li key={`main-feature-${index}`} className="flex items-center gap-1.5 text-left">
                  <Check className="w-5 h-5 shrink-0 text-green-600" />
                  {feature}
                </li>
              ))}
            </ul>

            <div className="mt-12 flex flex-col items-center gap-5 sm:flex-row">
              <div className="flex -space-x-4">
                {userPhotosHero.map((userPhoto, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <div key={`user-photos-hero-${index}`} className="relative h-10 w-10">
                    <Image
                      src={userPhoto}
                      alt="user image"
                      fill
                      className="rounded-full ring-2 ring-slate-100"
                    />
                  </div>
                ))}
              </div>
              <div className="flex flex-col justify-between items-center sm:items-start">
                <Stars quantity={5} />
                <p>
                  <span className="font-semibold">{formatNumber(numCustomers)}</span>
                  {' '}
                  happy customers
                </p>
              </div>
            </div>
          </div>

          <div className="px-8 sm:px-16 md:px-0 mt-32 lg:mt-20 lg:mx-0 w-full h-fit flex justify-center lg:col-span-1">
            <div className="relative md:max-w-xl">
              <Image
                src="/your-image.png"
                alt=""
                width={619}
                height={428}
                className="absolute hidden sm:block lg:hidden xl:block w-40 lg:w-52 -top-20 left-56"
              />
              <Image
                src="/line.png"
                alt=""
                width={339}
                height={608}
                className="absolute w-20 -left-6 -bottom-6 select-none"
              />
              <Phone imgSrc="/testimonials/1.jpg" className="w-64" />
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
    </main>
  );
}
