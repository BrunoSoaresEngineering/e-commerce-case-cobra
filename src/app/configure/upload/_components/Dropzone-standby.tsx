/* eslint-disable jsx-a11y/alt-text */
import { Image } from 'lucide-react';

type DropzoneStandbyProps = {
  fileFormatsAccepted: string,
}

function DropzoneStandby({ fileFormatsAccepted }: DropzoneStandbyProps) {
  return (
    <>
      <Image className="w-6 h-6 text-zinc-500" />
      <p>
        <span className="font-semibold">Click to upload</span>
        {' '}
        or drag and drop
      </p>
      <p className="text-xs text-zinc-500">{fileFormatsAccepted}</p>
    </>
  );
}
export default DropzoneStandby;
