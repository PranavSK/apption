import { z } from 'zod';

export const userProfileSchema = z.object({
  username: z
    .string()
    .min(3)
    .max(15)
    .regex(/^[a-z0-9_]+$/),
  fullName: z.string().optional(),
  avatarUrl: z.string().optional(),
  website: z.string().optional(),
});
export type UserProfileData = z.infer<typeof userProfileSchema>;
