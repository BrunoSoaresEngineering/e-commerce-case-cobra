function getCoordinatesInConfigurator(
  phoneCaseOrigin: {left: number, top: number},
  containerOrigin: {left: number, top: number},
  imagePosition: {left: number, top: number},
): {left: number, top: number} {
  const leftOffset = phoneCaseOrigin.left - containerOrigin.left;
  const topOffset = phoneCaseOrigin.top - containerOrigin.top;

  const left = imagePosition.left - leftOffset;
  const top = imagePosition.top - topOffset;

  return { left, top };
}

async function loadInImgElement(userImageSrc: string) {
  const image = new Image();
  image.crossOrigin = 'anonymous';
  image.src = userImageSrc;
  await new Promise((resolve) => { image.onload = resolve; });

  return image;
}

function drawInNewCanvas(
  phoneCaseDimensions: { width: number, height: number },
  image: {
    imageElement: HTMLImageElement,
    coordinates: { left: number, top: number },
    dimensions: { width: number, height: number },
  },
): HTMLCanvasElement {
  const canvas = document.createElement('canvas');

  canvas.width = phoneCaseDimensions.width;
  canvas.height = phoneCaseDimensions.height;
  const ctx = canvas.getContext('2d');

  ctx?.drawImage(
    image.imageElement,
    image.coordinates.left,
    image.coordinates.top,
    image.dimensions.width,
    image.dimensions.height,
  );

  return canvas;
}

function canvasToFile(canvas: HTMLCanvasElement, fileName: string): Promise<File> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error('Error saving image.'));
        return;
      }
      const file = new File([blob], fileName, { type: 'image/png' });

      resolve(file);
    });
  });
}

export default {
  getCoordinatesInConfigurator,
  drawInNewCanvas,
  loadInImgElement,
  canvasToFile,
};
