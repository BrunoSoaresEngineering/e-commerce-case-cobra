import sharp from 'sharp';

export async function getRemoteImageSize(imageUrl: string) {
  const response = await fetch(imageUrl);
  const buffer = await response.arrayBuffer();

  const { width, height } = await sharp(buffer).metadata();
  return { width, height };
}
