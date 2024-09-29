import { createUploadthing, FileRouter } from 'uploadthing/next';
import { z } from 'zod';

const f = createUploadthing();

const validationSchema = z.object({ configId: z.string().optional() });

function handleOnUploadComplete({ metadata, file }) {
  const { configId } = metadata;

  return { configId };
}

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: '4MB' } })
    .input(validationSchema)
    .onUploadComplete(handleOnUploadComplete),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
