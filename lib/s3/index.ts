import { Client } from 'minio';

import { env } from '@/env';

export const s3 = new Client({
  endPoint: env.S3_SERVER_ENDPOINT,
  accessKey: env.S3_ACCESS_KEY,
  secretKey: env.S3_SECRET_KEY,
  useSSL: true,
});

export function getObjectUrl(bucket: string, key: string) {
  return `https://link.storjshare.io/s/juci47qc77y6r7olp2cizeeztvtq/${bucket}/${key}`;
}
