import { z } from 'zod';

export function zFile({
  sizeLimit = 1 * 1024 * 1024,
  acceptedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  isSourceList = false,
} = {}) {
  const base = z
    .custom<File | Blob>()
    .nullable()
    .refine((file) => {
      if (!file) return true;
      return file.size < sizeLimit;
    }, 'File size must be less than 1MB.')
    .refine(
      (file) => {
        if (!file) return true;
        return acceptedTypes.includes(file?.type);
      },
      `File type must be one of ${acceptedTypes.join(', ')}.`,
    );
  if (isSourceList) {
    return z
      .custom<FileList>()
      .transform((fileList) => fileList[0])
      .pipe(base);
  }
  return base;
}
