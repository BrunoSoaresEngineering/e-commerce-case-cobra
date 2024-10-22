import GoalCard from '@/components/Goal-card';
import MaxWidthWrapper from '@/components/Max-width-wrapper';
import orders from './_lib/orders';
import OrdersTable from './_components/Orders-table';

export const dynamic = 'force-dynamic';

const WEEKLY_GOAL = 500_00;
const MONTHLY_GOAL = 2500_00;

async function Dashboard() {
  const [lastWeekSum, lastMonthSum, ordersList] = await Promise.all(
    [orders.getAmountForLastWeek(), orders.getAmountForLastMonth(), orders.getAllPaid()],
  );

  return (
    <MaxWidthWrapper className="min-h-screen w-full flex flex-col gap-16 bg-muted/40">
      <div className="grid sm:grid-cols-2 gap-4 sm:py-4">
        <GoalCard period="Week" currentAmmount={lastWeekSum} goal={WEEKLY_GOAL} />
        <GoalCard period="Month" currentAmmount={lastMonthSum} goal={MONTHLY_GOAL} />
      </div>

      <h1 className="text-4xl font-bold tracking-tight">Incoming Orders</h1>

      <OrdersTable orders={ordersList} />
    </MaxWidthWrapper>
  );
}
export default Dashboard;
