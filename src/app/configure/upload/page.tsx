/* eslint-disable react/jsx-props-no-spreading */

'use client';

import { cn } from '@/lib/utils';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import Dropzone, { FileRejection } from 'react-dropzone';
import { useUploadThing } from '@/lib/uploadthing';
import { getFileFormatsPrintableString } from './_lib/dropzone-utils';
import DropzoneDragover from './_components/Dropzone-dragover';
import DropzoneUploading from './_components/Dropzone-uploading';
import DropzoneStandby from './_components/Dropzone-standby';
import DropzoneRedirect from './_components/Dropzone-redirect';

const fileFormatAccepted = {
  'image/png': ['.png'],
  'image/jpeg': ['.jpeg'],
  'image/jpg': ['.jpg'],
};

const fileFormatsAcceptedText = getFileFormatsPrintableString(fileFormatAccepted);

type DropzoneState = {
  isDragOver: boolean,
  isUploading: boolean,
  isPending: boolean,
}

function selectDropzoneContent(dropzoneState: DropzoneState, uploadProgress: number) {
  const { isUploading, isPending, isDragOver } = dropzoneState;

  if (isUploading) {
    return (
      <DropzoneUploading
        fileFormatsAccepted={fileFormatsAcceptedText}
        progressValue={uploadProgress}
      />
    );
  }

  if (isPending) {
    return <DropzoneRedirect />;
  }

  if (isDragOver) {
    return <DropzoneDragover fileFormatsAccepted={fileFormatsAcceptedText} />;
  }

  return <DropzoneStandby fileFormatsAccepted={fileFormatsAcceptedText} />;
}

function UploadPage() {
  const { toast } = useToast();
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const { startUpload, isUploading } = useUploadThing('imageUploader', {
    onUploadProgress: (progress) => setUploadProgress(progress),
    onClientUploadComplete: ([data]) => {
      const { configId } = data.serverData;
      startTransition(() => router.push(`/configure/design?id=${configId}`));
    },
  });

  const handleOnDropRejected = (fileRejections: FileRejection[]) => {
    const [file] = fileRejections;

    setIsDragOver(false);

    toast({
      title: `${file.file.type} type is not supported`,
      description: `Please select a supported file. Types supported: ${fileFormatsAcceptedText}`,
      variant: 'destructive',
    });
  };

  const handleOnDropAccepted = (acceptedFiles: File[]) => {
    startUpload(acceptedFiles, { configId: undefined });
    setIsDragOver(false);
  };

  return (
    <div className={cn(
      'h-full w-full my-16 p-2 rounded-xl ring-1 ring-inset',
      {
        'bg-blue-900/10 ring-blue-900/25': isDragOver,
        'bg-gray-900/5 ring-gray-900/10': isUploading || isPending || !isDragOver,
      },
    )}
    >
      <Dropzone
        accept={fileFormatAccepted}
        multiple={false}
        onDragEnter={() => setIsDragOver(true)}
        onDragLeave={() => setIsDragOver(false)}
        onDropRejected={handleOnDropRejected}
        onDropAccepted={handleOnDropAccepted}
      >
        {({ getRootProps, getInputProps }) => (
          <div
            className="h-full w-full flex flex-col gap-2 items-center text-zinc-700 text-sm"
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            {selectDropzoneContent({ isDragOver, isUploading, isPending }, uploadProgress)}
          </div>
        )}
      </Dropzone>
    </div>
  );
}
export default UploadPage;
