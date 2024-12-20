'use server';

import { db } from '@/db/client';
import { stripe } from '@/lib/stripe';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

type CreateCheckoutSessionProps = {
  configuration: {
    id: string,
    imageUrl: string,
  },
  totalPrice: number,
}

async function createCheckoutSession({ configuration, totalPrice }: CreateCheckoutSessionProps) {
  const user = await getKindeServerSession().getUser();

  let order = await db.order.findFirst({
    where: {
      configurationId: configuration.id,
      userId: user.id,
    },
  });

  if (!order) {
    order = await db.order.create({
      data: {
        userId: user.id,
        configurationId: configuration.id,
        amount: totalPrice,
      },
    });
  }

  const product = await stripe.products.create({
    name: 'Custom iPhone Case',
    images: [configuration.imageUrl],
    default_price_data: {
      currency: 'EUR',
      unit_amount: totalPrice,
    },
  });

  const stripeSession = await stripe.checkout.sessions.create({
    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${order.id}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/configure/preview?id=${configuration.id}`,
    mode: 'payment',
    shipping_address_collection: { allowed_countries: ['DE', 'US', 'PT'] },
    metadata: {
      userId: user.id,
      orderId: order.id,
    },
    line_items: [{ price: product.default_price as string, quantity: 1 }],
  });

  return { url: stripeSession.url };
}

export {
  createCheckoutSession,
};
