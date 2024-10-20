import { Loader2 } from 'lucide-react';

type Props = {
  title: string,
  text: string,
}
function WaitingComponent({ title, text }: Props) {
  return (
    <div className="mt-24 flex flex-col items-center gap-2">
      <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
      <h1 className="font-semibold text-xl">{title}</h1>
      <p>{text}</p>
    </div>
  );
}
export default WaitingComponent;
