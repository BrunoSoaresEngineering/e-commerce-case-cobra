'use client';

import { changeStatus } from '@/app/actions/order';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { OrderStatus } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useRouter } from 'next/navigation';

type Props = {
  id: string,
  orderStatus: OrderStatus
}

const labelMap: Record<keyof typeof OrderStatus, string> = {
  shipped: 'Shipped',
  awaiting_shipment: 'Awaiting Shipment',
  fulfilled: 'Fulfilled',
};

function StatusDropdown({ id, orderStatus }: Props) {
  const router = useRouter();
  const { mutate } = useMutation({
    mutationKey: ['change-order-status'],
    mutationFn: changeStatus,
    onSuccess: () => router.refresh(),
  });
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex justify-between items-center"
        >
          {labelMap[orderStatus]}
          <ChevronsUpDown className="h-4 w-4 ml-2 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {Object.keys(labelMap).map((status) => (
          <DropdownMenuItem
            key={status}
            className={cn(
              'flex gap-1 text-sm items-center p-2.5 cursor-default hover:bg-zinc-100',
              { 'bg-zinc-100': status === orderStatus },
            )}
            onClick={() => mutate({ id, newStatus: status as OrderStatus })}
          >
            <Check
              className={cn(
                'h-4 w-4 mr-2 text-primary',
                status !== orderStatus ? 'opacity-0' : 'opacity-100',
              )}
            />
            {labelMap[status as OrderStatus]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export default StatusDropdown;
