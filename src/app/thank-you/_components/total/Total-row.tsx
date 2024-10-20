import { formatCurrency } from '@/lib/formatters';

type TotalRowProps = {
  item: string,
  amount: number
}
function TotalRow({ item, amount }: TotalRowProps) {
  return (
    <div className="flex flex-row justify-between">
      <p>{item}</p>
      <p className="text-zinc-700">{formatCurrency(amount / 100)}</p>
    </div>
  );
}
export default TotalRow;
