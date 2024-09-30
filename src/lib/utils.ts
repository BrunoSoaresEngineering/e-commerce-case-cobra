import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import sharp from 'sharp';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRandomInt(max: number): number {
  return Math.floor(Math.random() * max);
}

export function splitArray<T>(array: Array<T>, numParts: number) {
  if (numParts === 0) {
    return [];
  }

  const result: Array<Array<T>> = [];

  array.forEach((element, index) => {
    const selectedArrayIndex = index % numParts;

    if (!result[selectedArrayIndex]) {
      result[selectedArrayIndex] = [];
    }

    result[selectedArrayIndex].push(element);
  });

  return result;
}

export function getNumberOfGridColumns(grid: HTMLDivElement | null) {
  if (!grid) {
    return 0;
  }

  const gridComputedStyle = window.getComputedStyle(grid);

  return gridComputedStyle.getPropertyValue('grid-template-columns').split(' ').length;
}

export async function getRemoteImageSize(imageUrl: string) {
  const response = await fetch(imageUrl);
  const buffer = await response.arrayBuffer();

  const { width, height } = await sharp(buffer).metadata();
  return { width, height };
}
