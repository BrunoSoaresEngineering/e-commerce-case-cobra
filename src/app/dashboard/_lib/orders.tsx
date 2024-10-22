import { db } from '@/db/client';

function getAllPaid() {
  return db.order.findMany({
    where: {
      isPaid: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      user: true,
      shippingAddress: true,
    },
  });
}

async function getTotalAmount(lastNumberOfDays: number) {
  const aggregatedValue = await db.order.aggregate({
    where: {
      isPaid: true,
      createdAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - lastNumberOfDays)),
      },
    },
    _sum: {
      amount: true,
    },
  });

  return aggregatedValue._sum.amount ?? 0;
}

const getAmountForLastWeek = () => getTotalAmount(7);
const getAmountForLastMonth = () => getTotalAmount(30);

const orders = {
  getAmountForLastWeek,
  getAmountForLastMonth,
  getAllPaid,
};

export default orders;
