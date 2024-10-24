import Link from 'next/link';
import Image from 'next/image';
import MaxWidthWrapper from '@/components/Max-width-wrapper';
import Phone from '@/components/Phone';
import Underline from '@/components/Underline';
import Reviews from '@/components/reviews/Reviews';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check } from 'lucide-react';
import { formatNumber } from '@/lib/formatters';
import Stars from '../components/Stars';
import snake2Image from '../../public/snake-2.png';
import horseImage from '../../public/horse.jpg';
import horsePhoneImage from '../../public/horse_phone.jpg';
import arrowImage from '../../public/arrow.png';

const mainFeatures = [
  'High-quality, durable material',
  '5 year print guarantee',
  'Modern iPhone models supported',
];

const productFeatures = [
  'High-quality silicone material',
  'Scratch and fingerprint resistant coating',
  'Wireless charging compatible',
  '5 year print warranty',
];

const userPhotosHero = [
  '/users/user-1.png',
  '/users/user-2.png',
  '/users/user-3.png',
  '/users/user-4.jpg',
  '/users/user-5.jpg',
];

const numCustomers = 2513;

const testimonials = [
  {
    id: crypto.randomUUID(),
    stars: 5,
    name: 'David',
    imageUrl: '/users/user-1.png',
    message: 'The case feels durable and I even got a compliment on the design. Had the case for two and a half months now and the image is super clear, on the case I had before, the image started fading into yellow-ish color after a couple weeks. Love it.',
  },
  {
    id: crypto.randomUUID(),
    stars: 5,
    name: 'João',
    imageUrl: '/users/user-4.jpg',
    message: 'I usually keep my phone together with my keys in my pocket and that led to some pretty heavy scratchmarks on all of my last phone cases. This one, besides a barely noticeable scratch on the corner, looks brand new after about half a year. I dig it.',
  },
];

const reviews = [
  {
    id: crypto.randomUUID(),
    imgSrc: '/testimonials/1.jpg',
  },
  {
    id: crypto.randomUUID(),
    imgSrc: '/testimonials/2.jpg',
  },
  {
    id: crypto.randomUUID(),
    imgSrc: '/testimonials/3.jpg',
  },
  {
    id: crypto.randomUUID(),
    imgSrc: '/testimonials/4.jpg',
  },
  {
    id: crypto.randomUUID(),
    imgSrc: '/testimonials/5.jpg',
  },
  {
    id: crypto.randomUUID(),
    imgSrc: '/testimonials/6.jpg',
  },
];

export default function Home() {
  return (
    <div className="bg-slate-50">
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
                <Stars quantity={5} size={4} />
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

      <section className="bg-slate-100 py-24">
        <MaxWidthWrapper className="flex flex-col items-center gap-16">
          <div className="flex flex-col lg:flex-row items-center gap-4 sm:gap-6">
            <Image
              src={snake2Image}
              alt="Casecobra image"
              className="order-2 w-24"
            />
            <h2 className="mt-2 order-3 lg:order-1 text-5xl md:text-6xl font-bold text-center text-balance tracking-tight leading-tight">
              What our
              {' '}
              <span className="relative">
                customers
                <Underline className="hidden sm:block absolute inset-x-0 -bottom-6 text-green-600" />
              </span>
              {' '}
              say
            </h2>
          </div>
          <div className="mx-auto lg:mx-0 px-4 max-w-2xl lg:max-w-none grid grid-cols-1 lg:grid-cols-2 gap-y-16">
            {testimonials.map((testimonial) => (
              <article key={testimonial.id} className="flex flex-col gap-4 lg:pr-8 xl:pr-20">
                <Stars quantity={testimonial.stars} size={5} />
                <div className="text-lg leading-8">
                  <p>
                    &quot;
                    {testimonial.message}
                    &quot;
                  </p>
                </div>
                <div className="flex gap-4 mt-2">
                  <Image
                    src={testimonial.imageUrl}
                    alt={`Picture of ${testimonial.name}`}
                    width={12}
                    height={12}
                    className="w-12 h-12 object-cover rounded-full"
                    sizes="10vw"
                  />
                  <div className="flex flex-col">
                    <p className="font-semibold">{testimonial.name}</p>
                    <div className="flex gap-1.5 items-center text-zinc-600">
                      <Check className="h-4 w-4 text-green-600 stroke-[3px]" />
                      <p className="text-sm">Verified Purchase</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div>
            <Reviews reviews={reviews} />
          </div>
        </MaxWidthWrapper>
      </section>

      <section>
        <MaxWidthWrapper className="py-24">
          <h2 className="px-6 text-5xl font-bold text-center tracking-tight text-balance leading-tight md:text-6xl">
            Upload your photo and get
            {' '}
            <span className="text-white bg-green-600">your own case</span>
            {' '}
            now!
          </h2>
          <div className="relative px-6 lg:px-8 mt-12 max-w-6xl flex flex-col md:grid grid-cols-2 items-center gap-40">
            <Image
              src={horseImage}
              alt=""
              className="h-80 md:h-full w-full max-w-sm md:justify-self-end object-cover shadow-2xl rounded-xl lg:rounded-2xl"
            />
            <Image
              src={arrowImage}
              alt=""
              className="absolute rotate-90 md:rotate-0 top-[25rem] md:top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
            />
            <Phone imgSrc={horsePhoneImage} className="w-60" />
          </div>
          <ul className="mx-auto mt-12 space-y-2 max-w-prose w-fit sm:text-lg">
            {productFeatures.map((feature, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <li key={`product-feature-${index}`} className="w-fit">
                <Check className="inline w-5 h-5 mr-1.5 text-green-600" />
                {feature}
              </li>
            ))}
          </ul>

          <div className="flex items-center">
            <Button asChild size="lg">
              <Link href="/configure/upload" className="mx-auto mt-8">
                Create your case now
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </MaxWidthWrapper>
      </section>
    </div>
  );
}
