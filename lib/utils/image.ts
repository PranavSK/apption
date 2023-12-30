import { type Area } from 'react-easy-crop';

import { getRotatedRectSize } from './math';

export async function createImageElement(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.src = src;
    // img.setAttribute('crossOrigin', 'anonymous')
    img.onload = () => resolve(img);
    img.onerror = reject;
  });
}

export async function getCroppedImage(
  imageSrc: string,
  crop: Area,
  rotation = 0,
  flip = { horizontal: false, vertical: false },
) {
  console.log('getCroppedImage');
  const img = await createImageElement(imageSrc);
  const { width: boundingWidth, height: boundingHeight } = getRotatedRectSize(
    img.width,
    img.height,
    rotation,
  );
  const canvas = new OffscreenCanvas(boundingWidth, boundingHeight);
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get canvas context.');

  ctx.translate(boundingWidth / 2, boundingHeight / 2);
  ctx.rotate(rotation);
  ctx.translate(-boundingWidth / 2, -boundingHeight / 2);
  ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
  ctx.drawImage(img, 0, 0);

  const { x: cropX, y: cropY, width: cropWidth, height: cropHeight } = crop;
  const croppedCanvas = new OffscreenCanvas(cropWidth, cropHeight);
  const croppedCtx = croppedCanvas.getContext('2d');
  if (!croppedCtx) throw new Error('Could not get cropped canvas context.');
  croppedCtx.drawImage(canvas, cropX, cropY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);

  const blob = await croppedCanvas.convertToBlob({ type: 'image/webp' });
  return blob;
}
