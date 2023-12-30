import { loadEnvConfig } from '@next/env';
import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

if (!process.env.NEXT_PUBLIC_SITE_URL) {
  // Used outside nextjs - manually load env
  try {
    console.log('🔃 Loading env');
    //TODO: Need to change this in production.
    loadEnvConfig(process.cwd(), true);
  } catch (err) {
    console.error('❌ Failed to load env\n', err);
    process.exit(1);
  }
}

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    RESEND_API_KEY: z.string().min(1),
    GITHUB_CLIENT_ID: z.string().min(1),
    GITHUB_CLIENT_SECRET: z.string().min(1),
    S3_SERVER_ENDPOINT: z
      .string()
      .url()
      .transform((url) => url.replace(/^https?:\/\//, '')),
    S3_ACCESS_KEY: z.string().min(1),
    S3_SECRET_KEY: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_SITE_URL: z.string().url(),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    S3_SERVER_ENDPOINT: process.env.S3_SERVER_ENDPOINT,
    S3_ACCESS_KEY: process.env.S3_ACCESS_KEY,
    S3_SECRET_KEY: process.env.S3_SECRET_KEY,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  },
});
