'use server';

import { s3 } from '@/lib/s3';

export async function generatePresignedUrl(bucket: string, key: string) {
  // Check if bucket exists
  const bucketExists = await s3.bucketExists(bucket);
  if (!bucketExists) {
    await s3.makeBucket(bucket);
  }

  return s3.presignedPutObject(bucket, key, 60 * 3);
}
