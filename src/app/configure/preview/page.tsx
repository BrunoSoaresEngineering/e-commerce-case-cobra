import { Check } from 'lucide-react';
import { notFound } from 'next/navigation';
import Providers from '@/components/Providers';
import Phone from '@/components/Phone';
import { BASE_PRICE, PRODUCT_PRICES } from '@/config/products';
import { db } from '@/db/client';
import { formatCurrency } from '@/lib/formatters';
import {
  COLORS,
  FINISHES,
  MATERIALS,
  MODELS,
} from '@/validators/configuration-validator';
import CheckoutButton from './_components/Check-out-button';

type PreviewPageProps = {
  searchParams: { [key: string]: string | string[] | undefined }
}

async function PreviewPage({ searchParams }: PreviewPageProps) {
  const { id } = searchParams;

  if (!id || typeof id !== 'string') {
    return notFound();
  }

  const configuration = await db.configuration.findUnique({
    where: { id },
  });

  if (!configuration?.croppedImageUrl) {
    return notFound();
  }

  const caseColor = COLORS.find((color) => color.value === configuration.caseColor)?.tw;

  const phoneModel = MODELS.find((model) => model.value === configuration.phoneModel);

  const caseFinish = configuration.caseFinish && {
    description: FINISHES.find((finish) => finish.value === configuration.caseFinish)?.label,
    price: PRODUCT_PRICES.finish[configuration.caseFinish],
  };

  const caseMaterial = configuration.caseMaterial && {
    description: MATERIALS.find((material) => material.value === configuration.caseMaterial)?.label,
    price: PRODUCT_PRICES.material[configuration.caseMaterial],
  };

  const grandTotal = BASE_PRICE + (caseFinish?.price || 0) + (caseMaterial?.price || 0);

  return (
    <section className="mt-20 flex flex-col items-center md:grid md:grid-cols-12 md:grid-rows-1 md:gap-x-8 lg:gap-x-12">
      <Phone
        imgSrc={configuration.croppedImageUrl}
        className={`md:col-span-4 lg:col-span-3 max-w-[150px] md:max-w-full bg-${caseColor}`}
      />

      <div className="mt-6 md:col-span-8 lg:col-span-9 flex flex-col">
        <div className="self-center md:self-start">
          <h3 className="text-3xl text-gray-900 font-bold tracking-tight">
            Your
            {' '}
            {phoneModel?.label}
            {' '}
            Case
          </h3>

          <div className="flex flex-row items-center gap-1.5 mt-3 text-base">
            <Check className="text-green-500 h-4 w-4" />
            In stock and ready to ship
          </div>
        </div>

        <div>
          <div className="py-8 md:py-10 grid grid-cols-1 sm:grid-cols-2 gap-y-8 sm:gap-x-6 sm:py-6 border-b border-gray-200">
            <div>
              <p className="text-zinc-950 font-medium">Highlights</p>
              <ol className="mt-3 list-disc list-inside text-zinc-700">
                <li>Wireless charging compatible</li>
                <li>TPU shock absorption</li>
                <li>Packaging made from recycled materials</li>
                <li>5 year print warranty</li>
              </ol>
            </div>

            <div>
              <p className="text-zinc-950 font-medium">Materials</p>
              <ol className="mt-3 list-disc list-inside text-zinc-700">
                <li>High-quality, durable material</li>
                <li>Scratch and fingerprint resistant coating</li>
              </ol>
            </div>
          </div>

          <div className="mt-8">
            <div className="p-6 sm:p-8 bg-gray-50 text-sm">
              <div className="flex justify-between py-1 mt-2">
                <p className="text-gray-600">Base price</p>
                <p className="font-medium text-gray-900">{formatCurrency(BASE_PRICE / 100)}</p>
              </div>

              {caseFinish?.description && (
                <div className="flex justify-between py-1 mt-2">
                  <p className="text-gray-600">
                    {caseFinish.description}
                  </p>
                  <p className="font-medium text-gray-900">
                    {formatCurrency(caseFinish.price / 100)}
                  </p>
                </div>
              )}

              {caseMaterial?.description && (
                <div className="flex justify-between py-1 mt-2">
                  <p className="text-gray-600">
                    {caseMaterial.description}
                  </p>
                  <p className="font-medium text-gray-900">
                    {formatCurrency(caseMaterial.price / 100)}
                  </p>
                </div>
              )}

              <div aria-hidden className="my-2 h-px bg-gray-200" />

              <div className="flex justify-between items-center py-2 font-semibold text-gray-900">
                <p>Order Total</p>
                <p>{formatCurrency(grandTotal / 100)}</p>
              </div>
            </div>

            <div className="flex justify-end mt-8 mb-12">
              <Providers>
                <CheckoutButton configuration={configuration} totalPrice={grandTotal} />
              </Providers>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default PreviewPage;
