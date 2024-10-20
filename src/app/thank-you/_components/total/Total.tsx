import TotalRow from './Total-row';

type TotalProps = {
  subtotal: number,
  shipping: number,
}

function Total({ subtotal, shipping }: TotalProps) {
  const total = subtotal + shipping;

  return (
    <div className="space-y-6 text-sm">
      <TotalRow item="Subtotal" amount={subtotal} />
      <TotalRow item="Shipping" amount={shipping} />
      <TotalRow item="Total" amount={total} />
    </div>
  );
}
export default Total;
