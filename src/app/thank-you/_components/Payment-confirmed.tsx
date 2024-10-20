import { cn } from '@/lib/utils';
import MaxWidthWrapper from '@/components/Max-width-wrapper';
import PhoneInHand from '@/components/Phone-in-hand';
import type {
  BillingAddress,
  Configuration,
  Order,
  ShippingAddress,
} from '@prisma/client';
import Address from './Address';
import Total from './total/Total';

type OrderInformation = Order & {
  billingAddress: BillingAddress | null
} & {
  shippingAddress: ShippingAddress | null
} & {
  configuration: Configuration
}

type Props = {
  order: OrderInformation
}
function PaymentConfirmed({ order }: Props) {
  return (
    <MaxWidthWrapper className="py-16 bg-white">
      <p className="text-primary">Thank you!</p>
      <h1 className="text-4xl font-bold tracking-tight">Your case is on the way!</h1>
      <p className="mt-2 text-zinc-500">
        We&apos;ve received your order and are now processing it.
      </p>

      <h2 className="mt-12 text-sm font-medium text-zinc-900">Order number</h2>
      <p className="mt-2 text-sm text-zinc-500">{order.id}</p>

      <div className="mt-10 border-t border-zinc-200">
        <h2 className="mt-10 font-semibold">You made a great choice!</h2>
        <p className="mt-2 text-sm text-zinc-600">
          We at CaseCobra believe that a phone case doesn&apos;t only need to
          look good, but also last you for the years to come. We offer a
          5-year print guarantee: If you case isn&apos;t of the highest quality,
          we&apos;ll replace it for free.
        </p>
      </div>

      <div
        className={cn(
          'mt-4 rounded-xl lg:rounded-2xl bg-gray-900/5',
          'ring-1 ring-inset ring-gray-900/10 overflow-hidden',
        )}
      >
        <PhoneInHand
          croppedImageUrl={order.configuration.croppedImageUrl!}
          color={order.configuration.caseColor!}
        />
      </div>

      <div className="py-10 grid grid-cols-2 gap-x-6 text-sm">
        <Address title="Shipping Address" address={order.shippingAddress!} />
        <Address title="Billing Address" address={order.billingAddress!} />
      </div>

      <div className="py-10 grid grid-cols-2 gap-x-6 text-sm border-t border-zinc-200">
        <div>
          <h3 className="font-medium text-zinc-900">Payment status</h3>
          <p className="mt-2 text-zinc-700">Paid</p>
        </div>

        <div>
          <h3 className="font-medium text-zinc-900">Shipping Method</h3>
          <p className="mt-2 text-zinc-700">Express, takes up to 5 working days</p>
        </div>
      </div>

      <div className="pt-10 border-t border-zinc-200">
        <Total subtotal={order.amount} shipping={0} />
      </div>
    </MaxWidthWrapper>
  );
}
export default PaymentConfirmed;
