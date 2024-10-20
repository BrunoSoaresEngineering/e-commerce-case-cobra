'use server';

import { db } from '@/db/client';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export async function getPaymentStatus({ orderId }: { orderId: string }) {
  const user = await getKindeServerSession().getUser();

  if (!user?.id || !user.email) {
    throw new Error('You need to be logged in.');
  }

  const order = await db.order.findFirst({
    where: { id: orderId, userId: user.id },
    include: {
      billingAddress: true,
      shippingAddress: true,
      configuration: true,
    },
  });

  if (!order) {
    throw new Error('Order does not exist');
  }

  return order;
}
