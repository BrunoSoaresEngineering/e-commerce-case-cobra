import { MousePointerSquareDashed } from 'lucide-react';

type DropzoneDragoverProps = {
  fileFormatsAccepted: string,
}

function DropzoneDragover({ fileFormatsAccepted }: DropzoneDragoverProps) {
  return (
    <>
      <MousePointerSquareDashed className="w-6 h-6 text-zinc-500" />
      <p>
        <span className="font-semibold">Drop file</span>
        {' '}
        to upload
      </p>
      <p className="text-xs text-zinc-500">{fileFormatsAccepted}</p>
    </>
  );
}
export default DropzoneDragover;
