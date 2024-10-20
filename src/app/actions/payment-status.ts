'use server';

import { db } from '@/db/client';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { Order } from '@prisma/client';

export async function getPaymentStatus({ orderId }: { orderId: string }) {
  const user = await getKindeServerSession().getUser();

  if (!user?.id || !user.email) {
    throw new Error('You need to be logged in.');
  }

  const order = await new Promise<Order | null>((resolve) => {
    setTimeout(async () => resolve(await db.order.findFirst({
      where: { id: orderId, userId: user.id },
      include: {
        billingAddress: true,
        shippingAddress: true,
      },
    })), 2000);
  });

  if (!order) {
    throw new Error('Order does not exist');
  }

  return order;
}
