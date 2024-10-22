'use server';

import { db } from '@/db/client';
import { OrderStatus } from '@prisma/client';

type changeStatusArgs = {
  id: string,
  newStatus: OrderStatus,
}

async function changeStatus({ id, newStatus }: changeStatusArgs) {
  await db.order.update({
    where: { id },
    data: { status: newStatus },
  });
}

export {
  changeStatus,
};
