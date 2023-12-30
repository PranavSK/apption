import { z } from 'zod';

export const authFormSchema = z.object({
  email: z.string().describe('Email').email({ message: 'Invalid email' }),
});
export type AuthFormData = z.infer<typeof authFormSchema>;

export const authApiSchema = z.object({
  token: z.string(),
  next: z.string().optional(),
});
export type AuthApiData = z.infer<typeof authApiSchema>;

export const authGithubSchema = z.object({
  code: z.string(),
  state: z.string(),
});
export type AuthGithubData = z.infer<typeof authGithubSchema>;
