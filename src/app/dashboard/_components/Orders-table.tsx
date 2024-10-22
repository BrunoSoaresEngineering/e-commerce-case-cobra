import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatCurrency } from '@/lib/formatters';
import type { Order, ShippingAddress, User } from '@prisma/client';
import Providers from '@/components/Providers';
import StatusDropdown from './Status-dropdown';

type OrdersList = (Order & {
  shippingAddress: ShippingAddress | null
  user: User | null
})[]

type Props = {
  orders: OrdersList
}
function OrdersTable({ orders }: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Customer</TableHead>
          <TableHead className="hidden sm:table-cell">Status</TableHead>
          <TableHead className="hidden sm:table-cell">Purchase date</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id} className="bg-accent">
            <TableCell>
              {order.shippingAddress?.name}
              <p className="hidden md:block text-muted-foreground">{order.user?.email}</p>
            </TableCell>
            <TableCell className="hidden sm:table-cell">
              <Providers>
                <StatusDropdown id={order.id} orderStatus={order.status} />
              </Providers>
            </TableCell>
            <TableCell className="hidden sm:table-cell">
              {order.createdAt.toLocaleDateString()}
            </TableCell>
            <TableCell className="text-right">{formatCurrency(order.amount / 100)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
export default OrdersTable;
