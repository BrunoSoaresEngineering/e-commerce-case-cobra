import { Progress } from '@/components/ui/progress';
import { Loader2 } from 'lucide-react';

type DropzoneUploadingProps = {
  fileFormatsAccepted: string,
  progressValue: number
}

function DropzoneUploading({ fileFormatsAccepted, progressValue }: DropzoneUploadingProps) {
  return (
    <>
      <Loader2 className="animate-spin h-6 w-6 text-zinc-500" />
      <p>Uploading...</p>
      <Progress
        value={progressValue}
        className="w-40 h-2 bg-gray-300"
      />
      <p className="text-xs text-zinc-500">{fileFormatsAccepted}</p>
    </>
  );
}
export default DropzoneUploading;
