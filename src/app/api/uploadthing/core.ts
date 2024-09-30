import { db } from '@/db/client';
import { getRemoteImageSize } from '@/lib/utils';
import { createUploadthing, FileRouter } from 'uploadthing/next';
import { z } from 'zod';

const f = createUploadthing();

const validationSchema = z.object({ configId: z.string().optional() });

type HandleOnUploadCompleteProps = {
  metadata?: {
    input?: {
      configId: string,
    },
  },
  file: {
    url: string
  }
}

async function handleOnUploadComplete({ metadata, file }: HandleOnUploadCompleteProps) {
  const configId = metadata?.input?.configId;

  if (!configId) {
    const { width, height } = await getRemoteImageSize(file.url);

    const { id } = await db.configuration.create({
      data: {
        imageUrl: file.url,
        height: height || 500,
        width: width || 500,
      },
    });

    return { configId: id };
  }

  const { id } = await db.configuration.update({
    where: {
      id: configId,
    },
    data: {
      croppedImageUrl: file.url,
    },
  });

  return { configId: id };
}

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: '4MB' } })
    .input(validationSchema)
    .onUploadComplete(handleOnUploadComplete),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
