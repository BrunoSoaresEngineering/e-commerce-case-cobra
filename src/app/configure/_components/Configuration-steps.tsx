'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import image1 from '../../../../public/snake-1.png';
import image2 from '../../../../public/snake-2.png';
import image3 from '../../../../public/snake-3.png';

const steps = [
  {
    title: 'Step 1: Add image',
    description: 'Choose an image for your case',
    url: '/upload',
    image: image1,
  },
  {
    title: 'Step 2: Customize design',
    description: 'Make the case yours',
    url: '/design',
    image: image2,
  },
  {
    title: 'Step 3: Summary',
    description: 'Review your final design',
    url: '/preview',
    image: image3,
  },
];

function ConfigurationSteps() {
  const currentPath = usePathname();

  return (
    <ol className="lg:flex lg:border-l lg:border-r lg:border-gray-200">
      {steps.map((step, currentIndex, arraySteps) => {
        const isCurrentStep = currentPath.endsWith(step.url);

        const isCompleted = arraySteps.slice(currentIndex + 1).some(
          (stepAfter) => currentPath.endsWith(stepAfter.url),
        );

        return (
          <li key={step.title} className="relative lg:flex-1">
            {/* Step marker */}
            <div
              className={cn(
                'absolute left-0 top-0 lg:top-auto lg:bottom-0 h-full lg:h-1 w-1 lg:w-full bg-zinc-400',
                {
                  'bg-zinc-700': isCurrentStep,
                  'bg-primary': isCompleted,
                },
              )}
            />

            <div className="flex items-center gap-4 px-6 py-4 text-sm">
              <Image
                src={step.image}
                alt=""
                className="h-20 w-20 object-contain flex-shrink-0"
              />
              <div className="flex flex-col justify-center">
                <p className={`font-semibold ${isCompleted ? 'text-primary' : 'text-zinc-700'}`}>
                  {step.title}
                </p>
                <p className="text-zinc-500">{step.description}</p>
              </div>
            </div>

            {/* Step separator */}
            {currentIndex !== 0 && (
              <div className="hidden lg:block absolute inset-0 h-full w-3">
                <svg
                  className="h-full w-full text-gray-300"
                  viewBox="0 0 12 82"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0.5 0V31L10.5 41L0.5 51V82"
                    stroke="currentcolor"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
              </div>
            )}
          </li>
        );
      })}
    </ol>
  );
}
export default ConfigurationSteps;
