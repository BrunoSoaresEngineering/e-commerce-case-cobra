import type { BillingAddress } from '@prisma/client';

type Props = {
  title: string
  address: BillingAddress
}

function Address({ title, address }: Props) {
  return (
    <div>
      <h3 className="font-medium text-gray-900">{title}</h3>
      <address className="not-italic mt-2 text-zinc-700">
        <p>{address.name}</p>
        <p>{address.street}</p>
        <p>
          {address.postalCode}
          {' '}
          {address.city}
        </p>
      </address>
    </div>
  );
}
export default Address;
